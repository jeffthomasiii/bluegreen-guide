# BlueGreen Guide

**Discover Better Outdoors**

BlueGreen Guide is a static proof-of-concept outdoor discovery and wayfinding app for blue spaces and green spaces. It begins with paddleboarding and kayaking launch points, while the long-term vision is broader: helping people find, understand, and plan practical outdoor experiences across water and land.

Blue spaces include oceans, bays, rivers, lakes, reservoirs, lagoons, and harbors. Green spaces include parks, woods, gardens, trails, campgrounds, shoreline open space, and wildlife areas.

## Current Release

**v1.1.0 — Phase 1 Closeout and Design System 2.0**

Phase 1 remains complete as a working proof of concept. Post-v1.1.0 maintenance now includes the completed Launch Suitability Profile enhancement and three additional Mission Bay launch points. The runtime map includes:

- Interactive OpenStreetMap and Leaflet map
- 59 launch records across California, Nevada, and Arizona at runtime; v1.1.0 originally closed with 56 canonical records
- Separate Crown Point, De Anza Cove, and Sail Bay launch points within the broader Mission Bay destination
- Search across place names, aliases, water bodies, taxonomy, amenities, activities, tags, descriptions, and launch-suitability values
- Region, skill, activity, and maximum-difficulty filters
- Five curated collections that use explicit place IDs
- Map-bounds filtering and browser geolocation
- Launch cards and a responsive place-detail panel
- Launch Suitability Profile: SUP Suitability, Wind Sensitivity, Typical Use, Crowd Sensitivity, Staging Space, and Assessment Confidence
- Verification status, source-review metadata, official links, and safety-aware notes
- Credited representative photography with clear image status
- Responsive desktop, tablet, and mobile layouts
- Final Option B2 brand assets and blue, green, and neutral wayfinding semantics
- Public HTML documentation for Quick Start, Field Guide, Launch Suitability, Release Notes, and Roadmap
- Lightweight repository validation for data integrity, launch-profile values, canonical data synchronization, and internal links

## Phase 1 Status

Phase 1 is closed as a **complete proof of concept**. The Launch Suitability Profile is a completed post-v1.1.0 maintenance refinement, not a reopening of Phase 2.

The profile provides curated planning guidance rather than live measurements or safety guarantees. Wind Sensitivity describes how strongly increasing wind can affect a location; it is not current or forecast wind. Typical Use and Crowd Sensitivity replace the user-facing Popularity star treatment so heavily used places are not automatically presented as more desirable.

After implementation, the suitability ratings received a manual spot review using familiar real-world locations. SUP Suitability, Staging Space, and Assessment Confidence for the sampled places aligned with known on-the-ground experience. This supports the usefulness of the current rating framework, but it does not replace official-source verification or imply that every record has been individually field-verified.

This is not production software. Most records remain marked **Needs verification**, and representative images are not assumed to show the exact launch point. Users should confirm current access, legal launch locations, parking, fees, closures, water quality, weather, wind, tides, vessel traffic, and hazards through official sources before going.

Phase 2 is intentionally on hold until the project is ready to begin a focused structured place-detail pilot.

## Design System 2.0

The identity has two coordinated layers:

1. **Brand identity** — the Option B2 landscape mark represents water, land, discovery, and guidance without being tied to one activity.
2. **Wayfinding system** — category icons and markers communicate specific places, activities, amenities, and attributes.

Wayfinding semantics:

- **Blue:** water places and water activities
- **Green:** land places and land activities
- **Neutral:** amenities, services, and universal attributes

See [Design System 2.0](docs/brand-guide.md) and the [Wayfinding System](docs/wayfinding-system.md).

## Data Layers

Canonical launch data is JSON-driven:

- `data/launch-points.json` — authoritative base launch records
- `data/mission-bay-launch-points.json` — authoritative Mission Bay launch records added during the Launch Suitability maintenance pass

Generated browser data:

- `data/launch-points.js`
- `data/mission-bay-launch-points.js`

Other runtime data:

- `data/launch-profile.js` — curated launch-suitability enrichment only; it does not own or create place records
- `data/collections.js` — curated collection definitions

Do not edit the generated browser launch files directly. After changing canonical launch JSON, run:

```bash
node scripts/build-launch-data-js.js
```

Then validate the repository:

```bash
node scripts/validate-repo.js
```

The profile layer is intentionally separate from future Live Data such as current weather, wind, tides, and advisories.

Map markers should represent practical launch or shoreline-access locations when those can be reasonably supported. When an exact GPS point is inferred rather than published by an official source, that limitation should be documented rather than presented as an official waypoint.

## Run Locally

The app can be opened directly from `index.html`, although a local server provides behavior closer to GitHub Pages.

```bash
python3 -m http.server 8080
```

On Windows:

```powershell
py -m http.server 8080
```

Then open `http://localhost:8080`.

## GitHub Pages

The repository is configured for GitHub Pages from the `main` branch and repository root.

- App: `https://jeffthomasiii.github.io/bluegreen-guide/`
- Documentation: `https://jeffthomasiii.github.io/bluegreen-guide/docs/`

## Project Structure

```text
.
├── index.html
├── styles.css
├── design-system.css
├── phase-1-expansion.css
├── brand-refresh.css
├── ui-refresh.css
├── ui-responsive-fixes.css
├── app.js
├── collections-ui.js
├── ui-refresh.js
├── assets/
│   ├── brand/
│   └── icons/
├── data/
│   ├── launch-points.json
│   ├── launch-points.js
│   ├── mission-bay-launch-points.json
│   ├── mission-bay-launch-points.js
│   ├── launch-profile.js
│   └── collections.js
├── scripts/
│   ├── build-launch-data-js.js
│   ├── consolidate-launch-data.js
│   └── validate-repo.js
├── docs/
│   ├── index.html
│   ├── quick-start/
│   ├── user-guide/
│   ├── launch-suitability/
│   ├── release-notes/
│   ├── roadmap/
│   └── project reference Markdown
├── chatgpt-project/
└── .github/
```

## Documentation

### Public documentation

- [Documentation Home](docs/)
- [Quick Start](docs/quick-start/)
- [Field Guide & User Manual](docs/user-guide/)
- [Launch Suitability Profile](docs/launch-suitability/)
- [Release Notes](docs/release-notes/)
- [Roadmap](docs/roadmap/)

### Repository reference

- [Product Brief](docs/product-brief.md)
- [Phase Roadmap](docs/phase-roadmap.md)
- [Phase 1 Closeout](docs/phase-1-closeout.md)
- [Data Model](docs/data-model.md)
- [Official Source Verification](docs/source-verification.md)
- [Image Strategy](docs/image-strategy.md)
- [Design System 2.0](docs/brand-guide.md)
- [Wayfinding System](docs/wayfinding-system.md)
