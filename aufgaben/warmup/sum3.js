aufgabe({
  titel: "Summe von drei Zahlen",
  funktion: "sum3",
  parameter: ["zahlen"],
  text: `
    <p>Schreiben Sie eine Funktion <code>sum3()</code>, die ein Array mit genau drei Zahlen bekommt
    und die Summe aller Elemente zurückgibt.</p>
  `,
  tests: [
    { eingabe: [[1, 2, 3]], erwartet: 6 },
    { eingabe: [[5, 11, 2]], erwartet: 18 },
    { eingabe: [[7, 0, 0]], erwartet: 7 },
    { eingabe: [[1, 2, 1]], erwartet: 4 },
    { eingabe: [[1, 1, 1]], erwartet: 3 },
    { eingabe: [[2, 7, 2]], erwartet: 11 },
  ],
});
