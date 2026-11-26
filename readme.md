# SE1 Selbstkontrolle

Übungsseite für Funktionen mit Rückgabewert: Studierende schreiben eine Funktion,
klicken auf **Prüfen** und sehen sofort, welche Testfälle stimmen. Alles läuft im
Browser, es wird nichts gespeichert oder übertragen (außer dem eigenen Code im
`localStorage` des Browsers, damit er beim Neuladen nicht verloren geht).

## Aufbau

| Ordner / Datei | Inhalt |
|---|---|
| `aufgaben/uebersicht.js` | Kapitel und Reihenfolge der Aufgaben |
| `aufgaben/kapitel-XX/<name>.js` | eine Aufgabe: Text, Funktionsname, Testfälle |
| `pruefer/` | Ausführungskomponente (unabhängig von den Aufgaben) |
| `index.html`, `aufgabe.html` | Startseite und Aufgabenseite |

Es gibt keinen Build-Schritt. Die Seite läuft direkt über GitHub Pages oder lokal
durch Doppelklick auf `index.html`.

## Neue Aufgabe anlegen

1. Datei `aufgaben/kapitel-09/meineFunktion.js` anlegen:

```js
aufgabe({
  titel: "Überschrift der Aufgabe",
  funktion: "meineFunktion",            // Name der gesuchten Funktion
  parameter: ["a", "b"],                // optional: Funktionskopf im Editor vorgeben
  text: `<p>Aufgabentext (HTML erlaubt)</p>`,
  beispiele: 3,                         // optional: so viele Tests als Beispiel zeigen (Standard 3)
  eingabeUnveraendert: true,            // optional: übergebene Arrays dürfen nicht verändert werden
  tests: [
    { eingabe: [1, 2], erwartet: 3 },   // meineFunktion(1, 2) muss 3 zurückgeben
    { eingabe: [[4, 5], 0], erwartet: [4] },
  ],
});
```

2. In `aufgaben/uebersicht.js` den Dateinamen ohne `.js` in die Liste des Kapitels eintragen.

Ohne `parameter` bleibt der Editor leer und die Studierenden schreiben den Funktionskopf selbst.
Mit `vorgabe: "..."` lässt sich stattdessen beliebiger Startcode vorgeben.

Zahlen werden mit einer kleinen Toleranz verglichen (z. B. `0.1 + 0.2` gilt als `0.3`),
Arrays elementweise. Ein Text `"8"` ist nicht dasselbe wie die Zahl `8`.

## Prüfung

Der Code wird in einem Web Worker ausgeführt und nach 2 Sekunden abgebrochen
(Endlosschleifen frieren den Browser nicht ein). Ausgaben mit `console.log`
werden unter der Testtabelle angezeigt.

## Herkunft und Lizenz

Basiert auf [CodingJS](https://github.com/the-winter/codingjs) von the-winter und
Mitwirkenden (ISC-Lizenz, siehe `LICENSE`), angelehnt an
[CodingBat](https://codingbat.com/) von Nick Parlante. Der Editor ist
[CodeMirror 5](https://codemirror.net/5/) (MIT-Lizenz, siehe
`pruefer/vendor/codemirror/LICENSE`).
