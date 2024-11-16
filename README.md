# LSA Lumen Service App

Die **LSA Lumen Service App** ist ein Full-Stack-Projekt, das Verwaltungsaufgaben automatisiert und den Arbeitsalltag erleichtert. Ursprünglich entwickelt, um unser Festival besser zu organisieren, dient es gleichzeitig als **Portfolio**, um meine Fähigkeiten in der Webentwicklung zu präsentieren.

## Motivation

Während der Festivalplanung wurde klar, dass manuelle Verwaltungsaufgaben wie Zeiterfassung oder Gästelisten nervig und fehleranfällig sind. Mit LSA will ich genau diese Probleme lösen – und nebenbei zeigen, was ich als Entwickler draufhabe.

## Zielgruppe

- **Festivalorganisatoren**, die Abläufe optimieren möchten.  
- **Arbeitgeber**, die einen Entwickler suchen, der komplexe Probleme pragmatisch löst.

## Features

### Aktuelle Version (1.0)
- **Benutzerverwaltung**: Mitarbeiter erstellen und Rollen mit Berechtigungen vergeben.
- **Zeiterfassung**: Arbeitszeiten der Helfer tracken.
- **Markenverwaltung**: Verteilung und Rücklauf von Essens- und Getränkemarken.
- **Gästelistenverwaltung**: Wer hat welche Bändchen, und wie viele wurden zurückgegeben?

### Geplante Features (Version 2.0)
- **Lagerverwaltung**: Bestände der Bars im Blick.
- **Materialbewegungen**: Transfers zwischen Lager und Bars erfassen.

## Technische Details

- **Backend**: Node.js (Express)  
  Enthält Funktionen für Benutzer- und Gästeverwaltung.

- **Frontend**: React  
  Mobile-First-Design für die beste Nutzererfahrung. Ein Offline-Modus ist in Planung.

- **Datenbank**: MongoDB  
  Datenmodelle:
  - `User` (Benutzer)
  - `Role` (Rollen)
  - `Shift` (Arbeitszeiten)
  - `Ribbon` (Bändchen)
  - `GuestList` (Gäste)
  - Weitere: `Inventory`, `Movement`

## Roadmap

- [x] Grundlegendes Backend
- [ ] Frontend-Entwicklung
- [ ] Version 1.0 releasen
- [ ] Erweiterungen (Version 2.0)

## Herausforderungen

Dies ist mein erstes umfassendes Backend-Projekt. Neben der technischen Umsetzung liegt ein Fokus auf Skalierbarkeit und Nutzerfreundlichkeit.

## Beitrag leisten

Feedback ist immer willkommen! Fork das Projekt, erstelle einen Branch und schick mir einen Pull Request.

## Kontakt

Für Fragen oder Anfragen:  
📧 `meine.email@example.com`
