# BlueGreen Guide

**Discover Better Outdoors**

BlueGreen Guide is a static proof-of-concept outdoor discovery and wayfinding app for blue spaces and green spaces. It began with paddleboarding and kayaking launch points, while the long-term vision is broader: helping people find, understand, and plan practical outdoor experiences across water and land.

Blue spaces include oceans, bays, rivers, lakes, reservoirs, lagoons, and harbors. Green spaces include parks, woods, gardens, trails, campgrounds, shoreline open space, and wildlife areas.

## Current Field-Test Build

Phase 1 remains complete as a working proof of concept. The current **v1.2 field-test build** adds mobile/PWA readiness, the Launch Suitability Profile, generalized place data, and a deliberately small green/mixed pilot so the BlueGreen product model can be tested on site before Phase 2 resumes.

Repository validation resolves **89 unique active runtime places**. The pre-pilot runtime contains 80 unique places. The field-test layer contains 10 records, but one of them, Diamond Valley Lake, intentionally updates an existing place by stable ID rather than creating a duplicate. The pilot therefore adds 9 net-new places and enriches 1 existing place.

The 10 field-test records are:

- 4 mixed blue/green destinations: 3 net-new places plus a mixed-space overlay for the existing Diamond Valley Lake record
- 6 new green-space destinations
- Keller Trail / Greer Ranch remains outside the dataset pending better verification of the specific trailhead/access point

The green/mixed pilot includes Lake Perris State Recreation Area, Yucaipa Regional Park, Frank G. Bonelli Regional Park, Diamond Valley Lake, Box Springs Mountain Reserve, Sycamore Canyon Wilderness Park, Mount Rubidoux Park, California Citrus State Historic Park, UCR Botanic Gardens, and Santa Rosa Plateau Ecological Reserve.

Current capabilities include:

- Interactive OpenStreetMap and Leaflet map
- Installable Progressive Web App shell with network-driven map tiles and external content
- Mobile Explore, Map, and Nearby navigation with responsive sheets and controls
- Search across place names, aliases, water bodies, taxonomy, amenities, activities, tags, descriptions, and launch-suitability values
- Blue, green, and mixed place semantics
- Water and Land mobile discovery filters; mixed places intentionally appear in either relevant filter
- Region, paddling skill, water activity, and maximum paddle-difficulty filters for the existing paddle use case
- Five curated collections that use explicit place IDs
- Map-bounds filtering and browser geolocation
- Responsive place cards and details
- Launch Suitability Profile for paddle-relevant places
- Verification status, source-review metadata, official links, and safety-aware notes
- Credited representative photography for existing paddle places; new green/mixed pilot photography remains to be verified
- Responsive desktop, tablet, and mobile layouts
- Final Option B2 brand assets and blue, green, and neutral wayfinding semantics
- Lightweight repository validation for data integrity, place taxonomy, pilot composition, generated-data synchronization, and internal links

## Phase Status

Phase 1 remains closed as a **complete proof of concept**. v1.2 is the current field-test/maintenance build and does not reopen Phase 1. The green-space field-test pilot is a maintenance/validation expansion intended to test the existing BlueGreen architecture, not the beginning of the larger Phase 2 structured-place-detail work.

Most records remain marked **Needs verification**. Users should confirm current access, legal activity locations, parking, fees, closures, water quality, weather, wind, tides, vessel traffic, fire restrictions, trail conditions, and hazards through official sources before going.

Phase 2 is intentionally on hold until field testing provides enough evidence to refine the structured place model.

## Design System 2.0

The identity has two coordinated layers:

1. **Brand identity** — the Option B2 landscape mark represents water, land, discovery, and guidance without being tied to one activity.
2. **Wayfinding system** — category icons and markers communicate specific places, activities, amenities, and attributes.

Wayfinding semantics:

- **Blue:** water places and water activities
- **Green:** land places and land activities
- **Neutral:** amenities, services, and universal attributes
- **Mixed:** places with meaningful blue-space and green-space characteristics, represented through both relevant categories rather than a new arbitrary brand color

See [Design System 2.0](docs/brand-guide.md) and the [Wayfinding System](docs/wayfinding-system.md).

## Data Layers

The previous `launch-points.json` filename became misleading once BlueGreen Guide began deliberately storing parks, reserves, gardens, and other land destinations. The generalized base dataset is now named for what it contains: places.

Canonical JSON layers:

- `data/places.json` — authoritative base place records
- `data/mission-bay-launch-points.json` — authoritative Mission Bay place pilot records that replace the legacy aggregate Mission Bay record at runtime
- `data/green-space-field-test.json` — authoritative 10-record green/mixed field-test supplement while those places are evaluated on site; a matching stable ID overlays the existing place during the field test rather than creating a duplicate

Generated/browser loaders:

- `data/places.js`
- `data/mission-bay-launch-points.js`
- `data/green-space-field-test.js`

Other runtime data:

- `data/launch-profile.js` — launch-suitability enrichment for paddle-relevant places only; it does not own or create place records
- `data/collections.js` — curated collection definitions

Do not edit generated browser place files directly. After changing canonical place JSON, run:

```bash
node scripts/build-place-data-js.js
```

Then validate the repository:

```bash
node scripts/validate-repo.js
```

The green/mixed pilot remains a separate canonical layer during field testing so its records can be reviewed, adjusted, or removed without obscuring the proven base dataset. During this pilot, stable-ID matches intentionally overlay the corresponding base place. After field testing, retained records can be consolidated into `places.json` in a later cleanup.

Static place facts remain separate from future Live Data such as current weather, wind, tides, trail closures, environmental advisories, and other changing conditions.

Map coordinates should represent practical visitor, launch, shoreline-access, or trail-access locations when those can be reasonably supported. When an exact GPS point is inferred rather than published by an official source, that limitation must be documented rather than presented as an official waypoint.

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

## Live Site

GitHub Pages publishes from the `main` branch and repository root. The custom domain is the canonical public URL.

- App: `https://bgg.justathoughtblog.org/`
- Documentation: `https://bgg.justathoughtblog.org/docs/`
- Alpha entry: `https://bgg.justathoughtblog.org/alpha/`

The underlying GitHub Pages repository URL remains part of the hosting infrastructure but is not the preferred public-facing address.

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
├── mobile-ux.css
├── mobile-compact.css
├── mobile-layout-polish.css
├── app.js
├── collections-ui.js
├── ui-refresh.js
├── service-worker.js
├── manifest.webmanifest
├── assets/
│   ├── brand/
│   └── icons/
├── data/
│   ├── places.json
│   ├── places.js
│   ├── mission-bay-launch-points.json
│   ├── mission-bay-launch-points.js
│   ├── green-space-field-test.json
│   ├── green-space-field-test.js
│   ├── launch-profile.js
│   └── collections.js
├── scripts/
│   ├── build-place-data-js.js
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
├── alpha/
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
- [Development Workflow](docs/development-workflow.md)
- [Changelog](docs/changelog.md)
