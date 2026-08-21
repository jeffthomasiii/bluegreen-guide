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

Canonical place records currently live in three JSON layers:

- `data/places.json` — authoritative base place records
- `data/mission-bay-launch-points.json` — Mission Bay place-pilot records that replace the legacy aggregate Mission Bay record at runtime
- `data/green-space-field-test.json` — 10-place green/mixed field-test supplement during on-site testing

After editing canonical place data:

```bash
node scripts/build-place-data-js.js
node scripts/validate-repo.js
```

Browser/runtime files include `data/places.js`, `data/mission-bay-launch-points.js`, and `data/green-space-field-test.js`. Change canonical JSON rather than hand-editing browser data when place facts change.

`data/launch-profile.js` enriches paddle-relevant records with curated suitability fields. It must not create or own place records and leaves records marked `paddleRelevant: false` unchanged.

Curated collections are maintained in `data/collections.js`. Collection `placeIds` must reference existing runtime place IDs.

Repository validation currently resolves 89 active runtime places in the field-test branch: 79 existing active records after Mission Bay replacement plus four mixed and six green pilot records. A recent deployed-app screenshot displayed 80 places before the pilot. Treat that one-place difference as a runtime/cache/legacy-data reconciliation item; do not add an unsupported record simply to force the total to 90.

Keller Trail / Greer Ranch remains outside the canonical dataset until the specific trailhead/access point can be better verified.

### Coordinate Rule

Map markers should represent a practical visitor, launch, shoreline-access, or trail-access location whenever that point can be reasonably supported. Do not default to a broad park, lake, reserve, or neighborhood centroid when a more useful access coordinate is available.

If an official source verifies the place but does not publish an exact GPS waypoint, document that limitation in `sourceNotes` and do not present the inferred coordinate as official. Field testing may be used to improve representative access coordinates.

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

- Desktop, tablet, and mobile layouts
- Map rendering and blue/green/mixed marker behavior
- Water and Land discovery filters; mixed places should appear in both
- Marker placement at practical visitor/launch/trail access locations
- Search and paddle-specific filters
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

- Valid canonical JSON layers
- Required place fields and unique IDs
- Coordinate, difficulty, and legacy popularity ranges where applicable
- Launch Suitability Profile enum values for paddle places
- Green/mixed field-test pilot composition
- Keller/Greer exclusion pending verification
- Collection IDs and place references
- Browser/runtime data synchronization
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

Documentation describing ratings, verification status, coordinates, taxonomy, or data semantics must remain consistent with the canonical JSON, [Data Model](data-model.md), and [Phase Roadmap](phase-roadmap.md).

## Safety and Data Rule

Do not invent or overstate legal access, parking, fees, hours or closures, restrooms or rentals, tides or wind, water quality, hazards, verified photography, or exact visitor/launch/trail coordinates when only a general facility location is supported.

Use `Unknown`, `Needs verification`, `Check official source`, or `Conditions vary` when material details remain uncertain. An official source may confirm place identity and general recreation without verifying every operational field. Temporary closures and other changing conditions should not be embedded as permanent place facts.

## Phase Discipline

Phase 1 is complete as of v1.1.0. Phase 2 is on hold.

The green-space field-test pilot is a maintenance/validation expansion of the existing proof of concept. Maintenance work may improve source links, verification, photography, accessibility, documentation, coordinates, taxonomy, and defects without reopening Phase 1 or expanding scope into live conditions, community features, accounts, or AI.
