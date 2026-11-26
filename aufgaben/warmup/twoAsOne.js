aufgabe({
  titel: "Zwei ergeben die dritte",
  funktion: "twoAsOne",
  parameter: ["a", "b", "c"],
  text: `
    <p>Schreiben Sie eine Funktion <code>twoAsOne()</code>, die drei ganze Zahlen bekommt.
    Sie gibt <code>true</code> zurück, wenn sich zwei der Zahlen zur dritten addieren lassen, sonst <code>false</code>.</p>
  `,
  tests: [
    { eingabe: [1, 2, 3], erwartet: true },
    { eingabe: [3, 1, 2], erwartet: true },
    { eingabe: [3, 2, 2], erwartet: false },
    { eingabe: [2, 3, 1], erwartet: true },
    { eingabe: [5, 3, -2], erwartet: true },
    { eingabe: [5, 3, -3], erwartet: false },
    { eingabe: [2, 5, 3], erwartet: true },
    { eingabe: [9, 5, 5], erwartet: false },
    { eingabe: [9, 4, 5], erwartet: true },
    { eingabe: [5, 4, 9], erwartet: true },
    { eingabe: [3, 3, 0], erwartet: true },
    { eingabe: [3, 3, 2], erwartet: false },
  ],
});
