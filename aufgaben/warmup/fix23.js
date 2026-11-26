aufgabe({
  titel: "Aus 2, 3 wird 2, 0",
  funktion: "fix23",
  parameter: ["zahlen"],
  text: `
    <p>Schreiben Sie eine Funktion <code>fix23()</code>, die ein Array mit genau drei Zahlen bekommt.
    Folgt im Array direkt auf eine 2 eine 3, wird diese 3 durch 0 ersetzt.
    Die Funktion gibt das geänderte Array zurück.</p>
  `,
  tests: [
    { eingabe: [[1, 2, 3]], erwartet: [1, 2, 0] },
    { eingabe: [[2, 3, 5]], erwartet: [2, 0, 5] },
    { eingabe: [[1, 2, 1]], erwartet: [1, 2, 1] },
    { eingabe: [[3, 2, 1]], erwartet: [3, 2, 1] },
    { eingabe: [[2, 2, 3]], erwartet: [2, 2, 0] },
    { eingabe: [[2, 3, 3]], erwartet: [2, 0, 3] },
  ],
});
