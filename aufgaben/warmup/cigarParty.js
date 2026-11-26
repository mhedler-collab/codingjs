aufgabe({
  titel: "Eichhörnchen-Party",
  funktion: "cigarParty",
  parameter: ["nuesse", "istWochenende"],
  text: `
    <p>Wenn Eichhörnchen eine Party feiern, essen sie Nüsse. Die Party ist gelungen, wenn es zwischen
    40 und 60 Nüsse gibt, einschließlich der Grenzen. Am Wochenende gibt es keine Obergrenze.</p>
    <p>Schreiben Sie eine Funktion <code>cigarParty()</code>, die für die Anzahl Nüsse und die Angabe,
    ob Wochenende ist, <code>true</code> zurückgibt, wenn die Party gelungen ist, sonst <code>false</code>.</p>
  `,
  tests: [
    { eingabe: [30, false], erwartet: false },
    { eingabe: [50, false], erwartet: true },
    { eingabe: [70, true], erwartet: true },
    { eingabe: [30, true], erwartet: false },
    { eingabe: [50, true], erwartet: true },
    { eingabe: [60, false], erwartet: true },
    { eingabe: [61, false], erwartet: false },
    { eingabe: [40, false], erwartet: true },
    { eingabe: [39, false], erwartet: false },
    { eingabe: [40, true], erwartet: true },
    { eingabe: [39, true], erwartet: false },
  ],
});
