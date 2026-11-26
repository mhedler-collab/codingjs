aufgabe({
  titel: "Nur Werte aus einem Bereich",
  funktion: "nurZwischen",
  parameter: ["werte", "untergrenze", "obergrenze"],
  text: `
    <p>Schreiben Sie eine Funktion <code>nurZwischen()</code>, die ein Array sowie eine Unter- und
    eine Obergrenze bekommt. Sie gibt ein neues Array mit allen Werten zurück, die einschließlich
    der Grenzen im Bereich liegen.</p>
    <p>Das übergebene Array bleibt unverändert.</p>
  `,
  // Prüft zusätzlich, dass die Funktion das übergebene Array nicht verändert.
  eingabeUnveraendert: true,
  tests: [
    { eingabe: [[3, 8, 12, 5, 10], 5, 10], erwartet: [8, 5, 10] },
    { eingabe: [[1, 2], 5, 10], erwartet: [] },
    { eingabe: [[], 0, 100], erwartet: [] },
    { eingabe: [[5, 10], 5, 10], erwartet: [5, 10] },
    { eingabe: [[-3, 0, 3], -1, 1], erwartet: [0] },
    { eingabe: [[7, 7, 7], 7, 7], erwartet: [7, 7, 7] },
  ],
});
