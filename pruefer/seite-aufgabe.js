/* Aufgabenseite: Aufgabentext, Editor, Prüfen-Knopf und Ergebnistabelle. */
(function () {
  "use strict";

  const $ = function (id) { return document.getElementById(id); };

  function speichern(schluessel, wert) {
    try { localStorage.setItem(schluessel, wert); } catch (e) { /* egal */ }
  }
  function laden(schluessel) {
    try { return localStorage.getItem(schluessel); } catch (e) { return null; }
  }
  function entfernen(schluessel) {
    try { localStorage.removeItem(schluessel); } catch (e) { /* egal */ }
  }

  function zeigeMeldung(text) {
    $("aufgabe").hidden = true;
    $("meldung").hidden = false;
    $("meldung").textContent = text;
  }

  const id = new URLSearchParams(location.search).get("a");
  const alle = Aufgaben.alleIds();
  const position = alle.findIndex(function (e) { return e.id === id; });

  if (position < 0) {
    zeigeMeldung("Diese Aufgabe gibt es nicht. Zurück zur Übersicht und eine Aufgabe auswählen.");
    return;
  }

  // Navigation
  function setzeLink(element, eintrag) {
    if (eintrag) {
      element.href = "aufgabe.html?a=" + encodeURIComponent(eintrag.id);
    } else {
      element.classList.add("deaktiviert");
      element.removeAttribute("href");
    }
  }
  setzeLink($("vorherige"), alle[position - 1]);
  setzeLink($("naechste"), alle[position + 1]);
  $("uebersicht").href = "index.html?kapitel=" + alle[position].kapitel.nummer;

  Aufgaben.ladeAufgaben([id]).then(function (liste) {
    const aufgabe = liste[0];
    if (!aufgabe) {
      zeigeMeldung("Die Aufgabendatei aufgaben/" + id + ".js wurde nicht gefunden.");
      return;
    }
    zeigeAufgabe(aufgabe, alle[position].kapitel);
  });

  function startcode(aufgabe) {
    if (aufgabe.vorgabe !== undefined) return aufgabe.vorgabe;
    const parameter = aufgabe.parameter || [];
    return "function " + aufgabe.funktion + "(" + parameter.join(", ") + ") {\n  \n}\n";
  }

  function zeigeAufgabe(aufgabe, kapitel) {
    document.title = aufgabe.titel + " · SE1 Selbstkontrolle";
    $("kapitelname").textContent = "Kapitel " + kapitel.nummer + ": " + kapitel.titel;
    $("titel").textContent = aufgabe.titel;
    $("text").innerHTML = aufgabe.text; // Aufgabentexte stammen aus dem Repository
    $("funktionsname").textContent = aufgabe.funktion + "()";

    // Beispiele
    const anzahlBeispiele = aufgabe.beispiele === undefined ? 3 : aufgabe.beispiele;
    const beispielListe = $("beispiele");
    aufgabe.tests.slice(0, anzahlBeispiele).forEach(function (t) {
      const li = document.createElement("li");
      li.textContent = aufgabe.funktion + "(" + t.eingabe.map(function (w) { return Pruefer.format(w); }).join(", ") +
        ") → " + Pruefer.format(t.erwartet);
      beispielListe.appendChild(li);
    });
    $("beispielbereich").hidden = anzahlBeispiele === 0;

    // Editor
    const speicherSchluessel = "code:" + aufgabe.id;
    const editor = CodeMirror.fromTextArea($("code"), {
      lineNumbers: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      mode: "javascript",
      indentUnit: 2,
      tabSize: 2,
      extraKeys: {
        "Ctrl-Enter": pruefen,
        "Cmd-Enter": pruefen,
        "Ctrl-/": "toggleComment",
        "Cmd-/": "toggleComment",
        Tab: function (cm) { cm.execCommand("indentMore"); },
        "Shift-Tab": function (cm) { cm.execCommand("indentLess"); },
      },
    });
    const gespeichert = laden(speicherSchluessel);
    editor.setValue(gespeichert !== null ? gespeichert : startcode(aufgabe));
    if (gespeichert === null && aufgabe.vorgabe === undefined) editor.setCursor({ line: 1, ch: 2 });
    editor.on("change", function () { speichern(speicherSchluessel, editor.getValue()); });
    editor.focus();

    $("pruefen").addEventListener("click", pruefen);
    $("zuruecksetzen").addEventListener("click", function () {
      if (!window.confirm("Ihren Code löschen und mit der Vorlage neu beginnen?")) return;
      entfernen(speicherSchluessel);
      editor.setValue(startcode(aufgabe));
      $("ergebnis").hidden = true;
      editor.focus();
    });

    function pruefen() {
      $("pruefen").disabled = true;
      $("ergebnis").hidden = false;
      $("zusammenfassung").className = "";
      $("zusammenfassung").textContent = "Wird geprüft …";
      Pruefer.pruefe(editor.getValue(), aufgabe).then(function (antwort) {
        $("pruefen").disabled = false;
        zeigeErgebnis(aufgabe, antwort);
      });
    }
  }

  function zeigeErgebnis(aufgabe, antwort) {
    const zusammenfassung = $("zusammenfassung");
    const tabelle = $("tests");
    tabelle.innerHTML = "";
    $("testtabelle").hidden = true;
    $("hinweis").textContent = "";

    // Konsolenausgaben
    const ausgaben = antwort.ausgaben || [];
    $("konsolenbereich").hidden = ausgaben.length === 0;
    $("konsole").textContent = ausgaben.join("\n");

    if (antwort.zeitueberschreitung) {
      zusammenfassung.className = "fehler";
      zusammenfassung.textContent = "Abgebrochen: Ihr Code lief länger als " + Pruefer.ZEITLIMIT_MS / 1000 +
        " Sekunden. Läuft irgendwo eine Endlosschleife?";
      return;
    }
    if (antwort.fehler) {
      zusammenfassung.className = "fehler";
      zusammenfassung.textContent = "Fehler im Code: " + antwort.fehler;
      return;
    }
    if (antwort.fehlendeFunktion) {
      zusammenfassung.className = "fehler";
      zusammenfassung.textContent = "Keine Funktion mit dem Namen " + aufgabe.funktion +
        " gefunden. Achten Sie auf die genaue Schreibweise.";
      return;
    }

    const ergebnisse = antwort.ergebnisse;
    const bestanden = ergebnisse.filter(function (e) { return e.ok; }).length;
    $("testtabelle").hidden = false;

    ergebnisse.forEach(function (e) {
      const zeile = document.createElement("tr");
      zeile.className = e.ok ? "ok" : "falsch";
      [e.aufruf, e.erwartet, e.erhalten + (e.hinweis ? " (" + e.hinweis + ")" : ""), e.ok ? "✔" : "✘"]
        .forEach(function (inhalt, i) {
          const zelle = document.createElement("td");
          zelle.textContent = inhalt;
          if (i < 3) zelle.className = "codezelle";
          if (i === 3) zelle.className = "status";
          zeile.appendChild(zelle);
        });
      tabelle.appendChild(zeile);
    });

    if (bestanden === ergebnisse.length) {
      zusammenfassung.className = "geschafft";
      zusammenfassung.textContent = "Alle " + ergebnisse.length + " Tests bestanden. Gut gemacht!";
      speichern("geloest:" + aufgabe.id, "ja");
    } else {
      zusammenfassung.className = "teilweise";
      zusammenfassung.textContent = bestanden + " von " + ergebnisse.length + " Tests bestanden.";
      if (ergebnisse.some(function (e) { return e.undefiniert; })) {
        $("hinweis").textContent = "Ihre Funktion liefert undefined. Gibt sie das Ergebnis wirklich zurück?";
      } else if (ergebnisse.some(function (e) { return e.hinweis; })) {
        $("hinweis").textContent = "Ihre Funktion verändert das übergebene Array. Das soll sie hier nicht.";
      }
    }
  }
})();
