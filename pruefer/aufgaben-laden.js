/*
 * Lädt Kapitelübersicht und Aufgabendateien aus dem Ordner aufgaben/.
 * Die Dateien dort rufen nur kapitel({...}) bzw. aufgabe({...}) auf.
 */
(function () {
  "use strict";

  const kapitelListe = [];
  const aufgabenNachId = {};

  // Wird von aufgaben/uebersicht.js aufgerufen.
  window.kapitel = function (daten) {
    kapitelListe.push(daten);
  };

  // Wird von jeder Aufgabendatei aufgerufen. Die Id ergibt sich aus dem Dateipfad,
  // z. B. "kapitel-09/berechneParkgebuehr".
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

  // Alle Aufgaben-Ids in der Reihenfolge der Übersicht, mit Kapitel.
  function alleIds() {
    const ids = [];
    kapitelListe.forEach(function (k) {
      k.aufgaben.forEach(function (name) {
        ids.push({ id: k.ordner + "/" + name, kapitel: k });
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
    kapitelListe: kapitelListe,
    alleIds: alleIds,
    ladeAufgaben: ladeAufgaben,
  };
})();
