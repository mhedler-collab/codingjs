aufgabe({
  titel: "Schaltjahr",
  funktion: "istSchaltjahr",
  parameter: ["jahr"],
  text: `
    <p>Ein Jahr ist ein Schaltjahr, wenn es durch 4 teilbar ist. Ausnahme: Ist es auch durch 100
    teilbar, ist es kein Schaltjahr. Ausnahme von der Ausnahme: Ist es durch 400 teilbar, ist es
    doch ein Schaltjahr.</p>
    <p>Schreiben Sie eine Funktion <code>istSchaltjahr()</code>, die für ein Jahr
    <code>true</code> oder <code>false</code> zurückgibt.</p>
  `,
  tests: [
    { eingabe: [2024], erwartet: true },
    { eingabe: [2023], erwartet: false },
    { eingabe: [1900], erwartet: false },
    { eingabe: [2000], erwartet: true },
    { eingabe: [1996], erwartet: true },
    { eingabe: [2025], erwartet: false },
    { eingabe: [2100], erwartet: false },
    { eingabe: [2400], erwartet: true },
  ],
});
