# Development Workflow

## Current Architecture

BlueGreen Guide remains a static GitHub Pages-friendly project using:

- HTML
- CSS
- JavaScript
- Leaflet and OpenStreetMap
- JSON place data
- Small Node.js maintenance and validation scripts

Do not introduce a framework, database, account system, build platform, or production backend unless a later phase clearly requires it.

## Canonical Data Workflow

The authoritative place data is `data/launch-points.json`.

After editing it:

```bash
node scripts/build-launch-data-js.js
node scripts/validate-repo.js
```

`data/launch-points.js` is generated and should not be edited directly.

Curated collections are maintained in `data/collections.js`. Collection `placeIds` must reference existing canonical place IDs.

## Local Review

Start a local server from the repository root:

```bash
python3 -m http.server 8080
```

On Windows:

```powershell
py -m http.server 8080
```

Review:

- Desktop layout
- Tablet layout
- Mobile layout
- Map rendering and marker behavior
- Search and filters
- Curated collection counts and results
- Place cards and details
- Source links and verification wording
- Documentation navigation and screenshots

## Validation

Run:

```bash
node scripts/validate-repo.js
```

The script checks:

- Valid canonical JSON
- Required place fields
- Unique IDs
- Coordinate, difficulty, and popularity ranges
- Collection IDs and place references
- Generated browser data synchronization
- Required script loading
- Internal HTML links
- Absence of public `.md` links from the HTML documentation site

GitHub Actions runs the same validation on pushes and pull requests.

## Documentation Rule

Keep these layers synchronized:

1. Public HTML documentation for app users
2. Repository Markdown for maintainers
3. ChatGPT project source files for future collaboration

The root `README.md` is the authoritative repository status summary. `docs/phase-roadmap.md` is the detailed roadmap. `docs/changelog.md` is the release history.

## Safety and Data Rule

Do not invent or overstate:

- Legal access
- Parking
- Fees
- Hours or closures
- Restrooms or rentals
- Tides or wind
- Water quality
- Hazards
- Verified photography

Use `Unknown`, `Needs verification`, `Check official source`, or `Conditions vary` when material details remain uncertain.

## Phase Discipline

Phase 1 is complete as of v1.1.0. Phase 2 is on hold.

Maintenance work may improve source links, verification, photography, accessibility, and defects without reopening Phase 1 or expanding scope into live conditions, community features, accounts, or AI.
