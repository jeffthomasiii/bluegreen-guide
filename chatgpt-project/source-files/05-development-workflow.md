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

The generalized place dataset now uses:

- `data/places.json` — authoritative base place records
- `data/mission-bay-launch-points.json` — authoritative Mission Bay place-pilot records that replace the legacy aggregate Mission Bay record at runtime
- `data/green-space-field-test.json` — authoritative 10-place green/mixed field-test supplement during on-site testing

After editing canonical place data:

```bash
node scripts/build-place-data-js.js
node scripts/validate-repo.js
```

The build script generates `data/places.js` and refreshes the Mission Bay browser loader. `data/green-space-field-test.js` loads the field-test supplement. Do not edit generated/browser place files directly when the canonical JSON should be changed instead.

`data/launch-profile.js` enriches paddle-relevant records with suitability guidance. It must not create or own place records and must leave records with `paddleRelevant: false` unchanged.

Curated collections are maintained in `data/collections.js`. Collection `placeIds` must reference existing runtime place IDs.

The field-test build contains 90 runtime places: the existing 80 places plus four mixed and six green pilot records. Keller Trail / Greer Ranch remains outside the canonical dataset until the exact trailhead/access point can be better verified.

### Coordinate Rule

Markers should represent a practical visitor, launch, shoreline-access, or trail-access area when that location can be reasonably supported rather than a broad centroid when a more useful access point is known.

If an official source confirms a place but does not publish an exact GPS waypoint, document the limitation in `sourceNotes` and do not present the inferred coordinate as official. Use on-site testing to refine representative access coordinates where useful.

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
- Blue, green, and mixed marker behavior
- Water and Land discovery filters, including mixed places appearing in both relevant filters
- Marker placement at practical visitor/launch/trail access locations
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

- Valid canonical JSON layers
- Required place fields
- Unique IDs
- Coordinate, difficulty, and legacy popularity ranges where applicable
- Launch Suitability Profile enum values for paddle places
- Green/mixed pilot composition
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
- Exact visitor, launch, or trail coordinates when only a general facility location is supported

Use `Unknown`, `Needs verification`, `Check official source`, or `Conditions vary` when material details remain uncertain.

Official sources may establish place identity and general recreation without verifying every operational detail. Keep temporary closures and other changing conditions out of static place facts unless explicitly represented as a current/live layer.

## Phase Discipline

Phase 1 is complete as of v1.1.0. Phase 2 is on hold.

The green-space field-test pilot is a maintenance/validation expansion of the existing proof of concept. Maintenance work may improve source links, verification, photography, accessibility, coordinates, taxonomy, and defects without reopening Phase 1 or expanding scope into live conditions, community features, accounts, or AI.
