aufgabe({
  titel: "Grünes Los",
  funktion: "greenTicket",
  parameter: ["a", "b", "c"],
  text: `
    <p>Auf einem grünen Los stehen drei ganze Zahlen. Sind alle drei verschieden, ist das Ergebnis 0.
    Sind alle drei gleich, ist das Ergebnis 20. Sind genau zwei gleich, ist das Ergebnis 10.</p>
    <p>Schreiben Sie eine Funktion <code>greenTicket()</code>, die das Ergebnis für die drei Zahlen zurückgibt.</p>
  `,
  tests: [
    { eingabe: [1, 2, 3], erwartet: 0 },
    { eingabe: [2, 2, 2], erwartet: 20 },
    { eingabe: [1, 1, 2], erwartet: 10 },
    { eingabe: [2, 1, 1], erwartet: 10 },
    { eingabe: [1, 2, 1], erwartet: 10 },
    { eingabe: [3, 2, 1], erwartet: 0 },
    { eingabe: [0, 0, 0], erwartet: 20 },
    { eingabe: [2, 0, 0], erwartet: 10 },
    { eingabe: [0, 9, 10], erwartet: 0 },
    { eingabe: [0, 10, 0], erwartet: 10 },
    { eingabe: [9, 9, 9], erwartet: 20 },
    { eingabe: [9, 0, 9], erwartet: 10 },
  ],
});
