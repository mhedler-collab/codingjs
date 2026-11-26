/*
 * Lädt die Übersicht der Kategorien und die Aufgabendateien aus dem Ordner aufgaben/.
 * Die Dateien dort rufen nur kategorie({...}) bzw. aufgabe({...}) auf.
 */
(function () {
  "use strict";

  const kategorien = [];
  const aufgabenNachId = {};

  // Wird von aufgaben/uebersicht.js aufgerufen.
  window.kategorie = function (daten) {
    kategorien.push(daten);
  };

  // Wird von jeder Aufgabendatei aufgerufen. Die Id ergibt sich aus dem Dateipfad,
  // z. B. "warmup/sum3".
  window.aufgabe = function (daten) {
    const quelle = document.currentScript && document.currentScript.getAttribute("src");
    const treffer = quelle && quelle.match(/aufgaben\/(.+)\.js$/);
    if (!treffer) {
      console.error("aufgabe() konnte keiner Datei zugeordnet werden", daten);
      return;
    }
    daten.id = treffer[1];
    aufgabenNachId[daten.id] = daten;
  };

  // Alle Aufgaben-Ids in der Reihenfolge der Übersicht, mit Kategorie.
  function alleIds() {
    const ids = [];
    kategorien.forEach(function (k) {
      k.aufgaben.forEach(function (name) {
        ids.push({ id: k.ordner + "/" + name, kategorie: k });
      });
    });
    return ids;
  }

  function ladeSkript(pfad) {
    return new Promise(function (fertig) {
      const s = document.createElement("script");
      s.src = pfad;
      s.onload = function () { fertig(true); };
      s.onerror = function () {
        console.error("Datei nicht gefunden: " + pfad);
        fertig(false);
      };
      document.head.appendChild(s);
    });
  }

  function ladeAufgaben(ids) {
    return Promise.all(ids.map(function (id) {
      return ladeSkript("aufgaben/" + id + ".js");
    })).then(function () {
      return ids.map(function (id) { return aufgabenNachId[id]; });
    });
  }

  window.Aufgaben = {
    kategorien: kategorien,
    alleIds: alleIds,
    ladeAufgaben: ladeAufgaben,
  };
})();
