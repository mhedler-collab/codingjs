aufgabe({
  titel: "Die 6 am Rand",
  funktion: "firstLast6",
  parameter: ["zahlen"],
  text: `
    <p>Schreiben Sie eine Funktion <code>firstLast6()</code>, die ein Array mit Zahlen bekommt.
    Sie gibt <code>true</code> zurück, wenn die 6 am Anfang oder am Ende des Arrays steht, sonst <code>false</code>.</p>
    <p>Das Array hat mindestens ein Element.</p>
  `,
  tests: [
    { eingabe: [[1, 2, 6]], erwartet: true },
    { eingabe: [[6, 1, 2, 3]], erwartet: true },
    { eingabe: [[13, 6, 1, 2, 3]], erwartet: false },
    { eingabe: [[13, 6, 1, 2, 6]], erwartet: true },
    { eingabe: [[3, 2, 1]], erwartet: false },
    { eingabe: [[3, 6, 1]], erwartet: false },
    { eingabe: [[3, 6]], erwartet: true },
    { eingabe: [[6]], erwartet: true },
    { eingabe: [[3]], erwartet: false },
    { eingabe: [[5, 6]], erwartet: true },
    { eingabe: [[5, 5]], erwartet: false },
    { eingabe: [[1, 2, 3, 4, 6]], erwartet: true },
    { eingabe: [[1, 2, 3, 4]], erwartet: false },
  ],
});
