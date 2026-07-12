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
- 56 canonical launch records across Southern California, Central California, Nevada, and Arizona
- Search by location, water type, amenities, activity, skill, and notes
- Region, skill, activity, and difficulty filters
- Five curated editorial collections
- Water-body relationships for Dana Point Harbor, Newport Harbor, Huntington Harbour, Upper Newport Bay, and Alamitos Bay
- Popularity, difficulty, and best-time guidance
- Launch-point cards
- Launch detail view with verification status and source links
- Credited representative images for Phase 1 photo placeholders
- Map view filtering
- Mobile layout that keeps the map reachable before the full result list
- Design System 2.0 responsive shell and wayfinding key

### Phase 1 content expansion

The following requested destinations are now represented:

- Baby Beach / Mother's Beach, Dana Point Harbor — one canonical record with aliases to avoid duplication
- Newport Dunes Waterfront Resort & Marina
- Huntington Harbour — enriched existing record
- Sunset Aquatic Park
- Alamitos Bay — enriched existing record
- Long Beach Marine Stadium
- Existing Mother's Beach locations in Huntington Beach and Long Beach are grouped by their correct water bodies

The curated collections are:

- Beginner Favorites
- Family Friendly
- Calm Water
- Harbor Paddles
- Scenic Views

## Current Status

Phase 1 is complete as a working prototype. The live interface applies the B2 landscape direction through a lightweight inline SVG mark, Cormorant Garamond and Inter typography, refreshed surfaces, blue/green/neutral wayfinding cues, and collection-based discovery.

This is not production software yet: most seed data still needs a full source-verification pass, current photos are representative placeholders rather than confirmed place photos, the dataset remains water-launch focused, and final production logo and icon exports still need to replace the interim inline and text-based symbols.

All newly added or enriched access details remain marked **Needs verification**. Users should confirm launch rules, fees, parking, water quality, conditions, closures, and vessel traffic through official sources.

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
├── phase-1-expansion.css
├── app.js
├── collections-ui.js
├── assets/
│   └── brand/
├── data/
│   ├── launch-points.json
│   ├── launch-points.js
│   └── phase-1-expansion.js
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
