aufgabe({
  titel: "Aufsteigend sortiert?",
  funktion: "inOrderEqual",
  parameter: ["a", "b", "c", "gleichErlaubt"],
  text: `
    <p>Schreiben Sie eine Funktion <code>inOrderEqual()</code>, die drei Zahlen <code>a</code>, <code>b</code>,
    <code>c</code> und einen Wahrheitswert <code>gleichErlaubt</code> bekommt.</p>
    <p>Sie gibt <code>true</code> zurück, wenn die drei Zahlen streng aufsteigend sind, wie 2, 5, 11 oder 5, 6, 7,
    aber nicht 6, 5, 7 oder 5, 5, 7. Ist <code>gleichErlaubt</code> wahr, dürfen benachbarte Zahlen auch gleich
    sein, wie 5, 5, 7 oder 5, 5, 5. Sonst gibt sie <code>false</code> zurück.</p>
  `,
  tests: [
    { eingabe: [2, 5, 11, false], erwartet: true },
    { eingabe: [5, 7, 6, false], erwartet: false },
    { eingabe: [5, 5, 7, true], erwartet: true },
    { eingabe: [5, 5, 7, false], erwartet: false },
    { eingabe: [2, 5, 4, false], erwartet: false },
    { eingabe: [3, 4, 3, false], erwartet: false },
    { eingabe: [3, 4, 4, false], erwartet: false },
    { eingabe: [3, 4, 3, true], erwartet: false },
    { eingabe: [3, 4, 4, true], erwartet: true },
    { eingabe: [1, 5, 5, true], erwartet: true },
    { eingabe: [5, 5, 5, true], erwartet: true },
    { eingabe: [2, 2, 1, true], erwartet: false },
    { eingabe: [9, 2, 2, true], erwartet: false },
    { eingabe: [0, 1, 0, true], erwartet: false },
  ],
});
