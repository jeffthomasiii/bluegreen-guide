# BlueGreen Guide

BlueGreen Guide is a proof-of-concept outdoor map for finding paddleboarding and kayaking launch points through the lens of blue spaces and green spaces.

Blue spaces are outdoor places shaped by water: oceans, bays, rivers, lakes, reservoirs, lagoons, and harbors. Green spaces are natural or planted outdoor areas such as parks, woods, gardens, shorelines, and open space. The long-term product idea is to help people find restorative outdoor water experiences that are practical, safe, and nearby.

## Phase 1

This repo currently contains a static browser-based POC:

- Interactive OpenStreetMap/Leaflet map
- 50 seed launch points across Southern California, Central California, Nevada, and Arizona
- Search by location, water type, amenities, activity, skill, and notes
- Region, skill, activity, and difficulty filters
- Popularity, difficulty, and best-time guidance
- Launch-point cards
- Launch detail view with verification status and source links
- Credited representative images for Phase 1 photo placeholders
- Map view filtering
- Mobile layout that keeps the map reachable before the full result list
- Blue-primary visual system with green-space accent colors

## Run Locally

Open `index.html` directly in a browser, or run a local server from the repo root:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

On Windows, if Python is installed as `py`, use:

```powershell
py -m http.server 8080
```

## GitHub Pages

This repo is designed to work with GitHub Pages from the root folder.

1. Push the repo to GitHub.
2. Open the GitHub repo settings.
3. Go to **Pages**.
4. Set **Source** to **Deploy from a branch**.
5. Choose the `main` branch and `/root`.

## Project Structure

```text
.
├── index.html
├── styles.css
├── app.js
├── data/
│   ├── launch-points.json
│   └── launch-points.js
├── docs/
├── chatgpt-project/
└── .github/
```

## Current Status

This is not production software yet. It is a working Phase 1 prototype intended to validate the concept, data model, UI direction, and future development phases.

See [docs/phase-roadmap.md](docs/phase-roadmap.md) for the planned buildout.

See [docs/image-strategy.md](docs/image-strategy.md) for how representative photos should be replaced with verified launch-point photos over time.
