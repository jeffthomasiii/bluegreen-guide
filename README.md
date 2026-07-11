# BlueGreen Guide

**Discover Better Outdoors**

BlueGreen Guide is a proof-of-concept outdoor discovery and wayfinding app for blue spaces and green spaces. It begins with paddleboarding and kayaking launch points, but the long-term vision is broader: helping people find, understand, and plan practical outdoor experiences across water and land.

Blue spaces include oceans, bays, rivers, lakes, reservoirs, lagoons, and harbors. Green spaces include parks, woods, gardens, trails, campgrounds, shoreline open space, and wildlife areas.

## Design System 2.0

The BlueGreen Guide rebrand is approved, documented, and applied to the live prototype shell.

The identity uses two coordinated layers:

1. **Brand identity** — the Option B2 landscape mark represents water, land, discovery, and guidance without being tied to one activity.
2. **Wayfinding system** — category icons and markers communicate specific places, activities, amenities, and attributes.

Wayfinding semantics:

- **Blue:** water places and water activities
- **Green:** land places and land activities
- **Neutral:** amenities, services, and universal attributes such as Scenic View, Dog Friendly, Accessibility, Parking, and Restrooms

See [Design System 2.0](docs/brand-guide.md) and the [Wayfinding System](docs/wayfinding-system.md).

## Phase 1

The current static browser-based proof of concept includes:

- Interactive OpenStreetMap/Leaflet map
- 52 seed launch points across Southern California, Central California, Nevada, and Arizona
- Search by location, water type, amenities, activity, skill, and notes
- Region, skill, activity, and difficulty filters
- Popularity, difficulty, and best-time guidance
- Launch-point cards
- Launch detail view with verification status and source links
- Credited representative images for Phase 1 photo placeholders
- Map view filtering
- Mobile layout that keeps the map reachable before the full result list
- Design System 2.0 responsive shell and wayfinding key

## Current Status

Phase 1 is complete as a working prototype. The live interface now applies the B2 landscape direction through a lightweight inline SVG mark, Cormorant Garamond and Inter typography, refreshed surfaces, and blue/green/neutral wayfinding cues.

This is not production software yet: most seed data still needs a full source-verification pass, current photos are representative placeholders rather than confirmed place photos, the current dataset remains water-launch focused, and final production logo and icon exports still need to replace the interim inline and text-based symbols.

## Run Locally

Open `index.html` directly in a browser, or run a local server from the repo root:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

On Windows:

```powershell
py -m http.server 8080
```

## GitHub Pages

This repo is designed to work with GitHub Pages from the root folder.

1. Push the repo to GitHub.
2. Open the repository settings.
3. Go to **Pages**.
4. Set **Source** to **Deploy from a branch**.
5. Choose the `main` branch and `/root`.

## Project Structure

```text
.
├── index.html
├── styles.css
├── design-system.css
├── app.js
├── assets/
│   └── brand/
├── data/
│   ├── launch-points.json
│   └── launch-points.js
├── docs/
│   ├── brand-guide.md
│   ├── wayfinding-system.md
│   ├── phase-roadmap.md
│   └── ...
├── chatgpt-project/
└── .github/
```

## Documentation

- [Design System 2.0](docs/brand-guide.md)
- [Wayfinding System](docs/wayfinding-system.md)
- [Phase Roadmap](docs/phase-roadmap.md)
- [Image Strategy](docs/image-strategy.md)
- [Phase 1 Closeout](docs/phase-1-closeout.md)
