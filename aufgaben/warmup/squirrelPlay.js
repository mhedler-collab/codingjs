aufgabe({
  titel: "Spielen die Eichhörnchen?",
  funktion: "squirrelPlay",
  parameter: ["temperatur", "istSommer"],
  text: `
    <p>Eichhörnchen spielen, wenn die Temperatur zwischen 60 und 90 Grad Fahrenheit liegt, einschließlich der Grenzen.
    Im Sommer liegt die Obergrenze bei 100 statt 90.</p>
    <p>Schreiben Sie eine Funktion <code>squirrelPlay()</code>, die für eine Temperatur und die Angabe, ob Sommer ist,
    <code>true</code> zurückgibt, wenn die Eichhörnchen spielen, sonst <code>false</code>.</p>
  `,
  tests: [
    { eingabe: [70, false], erwartet: true },
    { eingabe: [95, false], erwartet: false },
    { eingabe: [95, true], erwartet: true },
    { eingabe: [90, false], erwartet: true },
    { eingabe: [90, true], erwartet: true },
    { eingabe: [50, false], erwartet: false },
    { eingabe: [50, true], erwartet: false },
    { eingabe: [100, false], erwartet: false },
    { eingabe: [100, true], erwartet: true },
    { eingabe: [105, true], erwartet: false },
    { eingabe: [59, false], erwartet: false },
    { eingabe: [59, true], erwartet: false },
    { eingabe: [60, false], erwartet: true },
  ],
});
