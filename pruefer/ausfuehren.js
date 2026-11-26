/*
 * Ausführungskomponente: führt den Code der Studierenden in einem Web Worker aus
 * und vergleicht die Rückgabewerte mit den erwarteten Ergebnissen einer Aufgabe.
 * Sie kennt keine einzelnen Aufgaben. Alles Aufgabenspezifische kommt aus aufgaben/.
 */
(function () {
  "use strict";

  const ZEITLIMIT_MS = 2000;

  // Stellt einen Wert so dar, wie man ihn in JavaScript schreiben würde.
  function format(wert, tiefe) {
    tiefe = tiefe || 0;
    if (tiefe > 5) return "…";
    if (wert === undefined) return "undefined";
    if (wert === null) return "null";
    if (typeof wert === "string") return JSON.stringify(wert);
    if (typeof wert === "number") return Object.is(wert, -0) ? "0" : String(wert);
    if (typeof wert === "function") return "function " + (wert.name || "") + "() {…}";
    if (Array.isArray(wert)) {
      return "[" + wert.map((w) => format(w, tiefe + 1)).join(", ") + "]";
    }
    if (typeof wert === "object") {
      const teile = Object.keys(wert).map((k) => k + ": " + format(wert[k], tiefe + 1));
      return "{" + teile.join(", ") + "}";
    }
    return String(wert);
  }

  // Dieser Teil läuft im Worker. Er wird als Text in einen Blob geschrieben,
  // damit die Seite auch ohne Webserver (direkt als Datei geöffnet) funktioniert.
  function workerHauptteil() {
    const MAX_AUSGABEN = 200;

    function formatKonsole(wert) {
      return typeof wert === "string" ? wert : format(wert);
    }

    function gleich(a, b) {
      if (typeof a === "number" && typeof b === "number") {
        if (Number.isNaN(a) && Number.isNaN(b)) return true;
        return Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));
      }
      if (Array.isArray(a) || Array.isArray(b)) {
        if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
          if (!gleich(a[i], b[i])) return false;
        }
        return true;
      }
      if (a && b && typeof a === "object" && typeof b === "object") {
        const ka = Object.keys(a);
        const kb = Object.keys(b);
        if (ka.length !== kb.length) return false;
        return ka.every((k) => Object.prototype.hasOwnProperty.call(b, k) && gleich(a[k], b[k]));
      }
      return a === b;
    }

    function kopie(wert) {
      return JSON.parse(JSON.stringify(wert));
    }

    self.onmessage = function (nachricht) {
      const auftrag = nachricht.data;
      const ausgaben = [];
      const protokolliere = function () {
        if (ausgaben.length < MAX_AUSGABEN) {
          ausgaben.push(Array.prototype.map.call(arguments, formatKonsole).join(" "));
        } else if (ausgaben.length === MAX_AUSGABEN) {
          ausgaben.push("… (weitere Ausgaben abgeschnitten)");
        }
      };
      console.log = protokolliere;
      console.info = protokolliere;
      console.warn = protokolliere;
      console.error = protokolliere;

      let funktion;
      try {
        const name = auftrag.funktion;
        funktion = new Function(
          auftrag.code + "\n;return typeof " + name + ' === "function" ? ' + name + " : undefined;"
        )();
      } catch (fehler) {
        self.postMessage({ fehler: String(fehler), ausgaben: ausgaben });
        return;
      }

      if (typeof funktion !== "function") {
        self.postMessage({ fehlendeFunktion: true, ausgaben: ausgaben });
        return;
      }

      const ergebnisse = auftrag.tests.map(function (test) {
        const argumente = kopie(test.eingabe);
        const aufruf = auftrag.funktion + "(" + test.eingabe.map((w) => format(w)).join(", ") + ")";
        const zeile = { aufruf: aufruf, erwartet: format(test.erwartet) };
        try {
          const rueckgabe = funktion.apply(null, argumente);
          zeile.erhalten = format(rueckgabe);
          zeile.ok = gleich(rueckgabe, test.erwartet);
          zeile.undefiniert = rueckgabe === undefined && test.erwartet !== undefined;
          if (auftrag.eingabeUnveraendert && !gleich(argumente, test.eingabe)) {
            zeile.ok = false;
            zeile.hinweis = "Eingabe wurde verändert";
          }
        } catch (fehler) {
          zeile.erhalten = String(fehler);
          zeile.ok = false;
          zeile.laufzeitfehler = true;
        }
        return zeile;
      });

      self.postMessage({ ergebnisse: ergebnisse, ausgaben: ausgaben });
    };
  }

  let workerUrl = null;

  function erzeugeWorker() {
    if (!workerUrl) {
      const quelltext =
        format.toString() + "\n(" + workerHauptteil.toString() + ")();";
      workerUrl = URL.createObjectURL(new Blob([quelltext], { type: "text/javascript" }));
    }
    return new Worker(workerUrl);
  }

  /**
   * Führt den Code aus und prüft ihn gegen die Tests der Aufgabe.
   * Liefert ein Promise mit { ergebnisse, ausgaben } oder { fehler } oder
   * { fehlendeFunktion } oder { zeitueberschreitung }.
   */
  function pruefe(code, aufgabe) {
    return new Promise(function (fertig) {
      const worker = erzeugeWorker();
      const uhr = setTimeout(function () {
        worker.terminate();
        fertig({ zeitueberschreitung: true, ausgaben: [] });
      }, ZEITLIMIT_MS);

      worker.onmessage = function (nachricht) {
        clearTimeout(uhr);
        worker.terminate();
        fertig(nachricht.data);
      };
      worker.onerror = function (ereignis) {
        clearTimeout(uhr);
        worker.terminate();
        ereignis.preventDefault();
        fertig({ fehler: ereignis.message || "Unbekannter Fehler", ausgaben: [] });
      };

      worker.postMessage({
        code: code,
        funktion: aufgabe.funktion,
        tests: aufgabe.tests,
        eingabeUnveraendert: !!aufgabe.eingabeUnveraendert,
      });
    });
  }

  window.Pruefer = { pruefe: pruefe, format: format, ZEITLIMIT_MS: ZEITLIMIT_MS };
})();
