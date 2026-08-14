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

Canonical launch records currently live in two JSON files:

- `data/launch-points.json` — authoritative base launch records
- `data/mission-bay-launch-points.json` — authoritative Mission Bay launch records added during the Launch Suitability maintenance pass

After editing canonical launch data:

```bash
node scripts/build-launch-data-js.js
node scripts/validate-repo.js
```

The build script generates:

- `data/launch-points.js`
- `data/mission-bay-launch-points.js`

Generated browser files should not be edited directly.

`data/launch-profile.js` enriches existing runtime records with curated suitability fields. It must not create or own place records.

Curated collections are maintained in `data/collections.js`. Collection `placeIds` must reference existing canonical place IDs.

### Coordinate Rule

Map markers should represent the practical launch or shoreline-access area whenever that location can be reasonably supported. Do not default to a broad park, neighborhood, lake, or water-body centroid when a more useful launch/access coordinate is available.

If an official source verifies the facility but does not publish an exact GPS waypoint, document that limitation in `sourceNotes` and do not present the inferred coordinate as official.

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
- Marker placement at practical launch/access locations
- Search and filters
- Curated collection counts and results
- Place cards and details
- Source links and verification wording
- Documentation navigation and screenshots
- Rating explanations and cross-links

## Validation

Run:

```bash
node scripts/validate-repo.js
```

The script checks:

- Valid canonical JSON across the launch-data files
- Required place fields
- Unique IDs
- Coordinate, difficulty, and legacy popularity ranges
- Launch Suitability Profile enum values
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

Documentation describing ratings, verification status, coordinates, or data semantics must remain consistent with the canonical JSON, [Data Model](data-model.md), and [Phase Roadmap](phase-roadmap.md).

Public documentation should explain user-facing suitability and guidance without implying a precise formula, real-time measurement, guaranteed suitability, or complete verification.

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
- Exact launch coordinates when only a general facility location is supported

Use `Unknown`, `Needs verification`, `Check official source`, or `Conditions vary` when material details remain uncertain.

A source link does not verify every field in a place record. Verification status must describe the confidence of the available information, not the quality of the destination or a guarantee of safe access.

## Phase Discipline

Phase 1 is complete as of v1.1.0. Phase 2 is on hold.

Maintenance work may improve source links, verification, photography, accessibility, documentation, coordinates, and defects without reopening Phase 1 or expanding scope into live conditions, community features, accounts, or AI.
