/* Startseite: zeigt alle Aufgaben, gruppiert nach Kapiteln. */
(function () {
  "use strict";

  function gespeichertGeloest(id) {
    try {
      return localStorage.getItem("geloest:" + id) === "ja";
    } catch (e) {
      return false;
    }
  }

  const ziel = document.getElementById("kapitel");
  const nurKapitel = new URLSearchParams(location.search).get("kapitel");

  Aufgaben.kapitelListe.forEach(function (k) {
    if (nurKapitel && String(k.nummer) !== nurKapitel) return;

    const abschnitt = document.createElement("section");
    abschnitt.className = "kapitel";
    const ueberschrift = document.createElement("h2");
    ueberschrift.textContent = "Kapitel " + k.nummer + ": " + k.titel;
    abschnitt.appendChild(ueberschrift);
    const liste = document.createElement("ol");
    liste.className = "aufgabenliste";
    abschnitt.appendChild(liste);
    ziel.appendChild(abschnitt);

    const ids = k.aufgaben.map(function (name) { return k.ordner + "/" + name; });
    Aufgaben.ladeAufgaben(ids).then(function (aufgaben) {
      aufgaben.forEach(function (a, i) {
        const li = document.createElement("li");
        if (!a) {
          li.textContent = ids[i] + " (Datei fehlt)";
          li.className = "fehlt";
        } else {
          const link = document.createElement("a");
          link.href = "aufgabe.html?a=" + encodeURIComponent(a.id);
          link.textContent = a.titel;
          li.appendChild(link);
          const fn = document.createElement("code");
          fn.textContent = " " + a.funktion + "()";
          li.appendChild(fn);
          if (gespeichertGeloest(a.id)) {
            const haken = document.createElement("span");
            haken.className = "haken";
            haken.textContent = " ✓";
            haken.title = "In diesem Browser schon gelöst";
            li.appendChild(haken);
          }
        }
        liste.appendChild(li);
      });
    });
  });
})();
