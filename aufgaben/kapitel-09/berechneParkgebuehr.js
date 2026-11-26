aufgabe({
  titel: "Parkgebühr",
  funktion: "berechneParkgebuehr",
  // Ohne "parameter" bleibt der Editor leer: Den Funktionskopf schreiben die Studierenden selbst.
  text: `
    <p>Ein Parkhaus verlangt 2 € Grundgebühr und 1,50 € pro Stunde.</p>
    <p>Schreiben Sie eine Funktion <code>berechneParkgebuehr()</code>, die für eine Anzahl Stunden
    die Gebühr in Euro zurückgibt.</p>
    <p>Kommazahlen schreiben Sie in JavaScript mit Punkt: <code>1.5</code>.</p>
  `,
  tests: [
    { eingabe: [4], erwartet: 8 },
    { eingabe: [1], erwartet: 3.5 },
    { eingabe: [0], erwartet: 2 },
    { eingabe: [2], erwartet: 5 },
    { eingabe: [3], erwartet: 6.5 },
    { eingabe: [10], erwartet: 17 },
  ],
});
