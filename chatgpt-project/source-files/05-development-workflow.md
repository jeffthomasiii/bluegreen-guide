# Development Workflow

## Current Architecture

BlueGreen Guide remains a static GitHub Pages-friendly project using HTML, CSS, browser JavaScript, Leaflet/OpenStreetMap, canonical JSON place data, a Progressive Web App shell, and small Node.js maintenance/validation scripts.

Do not introduce a framework, database, account system, build platform, production backend, live-data layer, community layer, or AI feature unless a later phase explicitly requires it.

## Canonical Data Workflow

Canonical place records currently live in three JSON layers:

- `data/places.json` — authoritative base place records
- `data/mission-bay-launch-points.json` — Mission Bay compatibility/pilot records
- `data/green-space-field-test.json` — current 10-record green/mixed field-test supplement

After changing canonical place data:

```bash
node scripts/build-place-data-js.js
node scripts/validate-repo.js
```

Do not restore the retired `data/launch-points.json` / `data/launch-points.js` workflow.

`data/launch-profile.js` enriches paddle-relevant places with Launch Suitability guidance and must not create or own place records.

Curated collections remain in `data/collections.js` and use explicit runtime place IDs.

Repository validation currently resolves 89 unique active runtime places. Diamond Valley Lake is a stable-ID overlay, so the 10-record green/mixed pilot contributes nine net-new places. Keller Trail / Greer Ranch remains outside the dataset pending better trailhead/access verification.

## Mobile/PWA Review

The current v1.2 field-test build includes:

- Explore, Map, and Nearby mobile navigation
- Mobile search/filter sheets
- Compact map tools
- Responsive filter wrapping
- PWA manifest and installability
- Versioned service-worker app-shell caching

Map tiles, official source pages, and other changing network resources remain network-driven. Do not describe BlueGreen Guide as fully offline.

When app-shell assets change, review the service-worker cache version so field testers do not remain on stale UI.

## Local Review

Run a local server:

```bash
python3 -m http.server 8080
```

Windows:

```powershell
py -m http.server 8080
```

Review desktop, tablet, and mobile layouts; Explore/Map/Nearby behavior; blue/green/mixed markers; Water/Land discovery; search; paddle filters; curated collections; place cards/details; Launch Suitability; source links; verification wording; marker access locations; and documentation navigation.

## Validation

Run:

```bash
node scripts/validate-repo.js
git diff --check
```

GitHub Actions runs repository validation on pushes and pull requests.

## Documentation Rule

Keep synchronized:

1. Public HTML documentation
2. Repository Markdown
3. ChatGPT project source files

The root `README.md` is the authoritative repository status summary. `docs/phase-roadmap.md` is the detailed roadmap. `docs/changelog.md` is the release history.

Preserve historical v1.1.0 counts and closeout details when they are clearly identified as historical; do not present them as the current runtime state.

## Safety and Data Rule

Do not invent or overstate legal access, parking, fees, hours/closures, restrooms/rentals, tides/wind, water quality, trail conditions, fire restrictions, hazards, verified photography, or exact access coordinates when only a general location is supported.

Use `Unknown`, `Needs verification`, `Check official source`, or `Conditions vary` when material details remain uncertain.

Keep static place facts, curated guidance, live conditions, environmental context, and derived insights distinct.

## Phase Discipline

Phase 1 is complete as of v1.1.0. v1.2 is the current mobile/PWA field-test and maintenance build. Phase 2 is on hold.

The green/mixed pilot is intended to validate the existing architecture before larger structured-place expansion. Maintenance may improve source links, verification, photography, accessibility, coordinates, taxonomy, mobile UX, documentation, and defects without reopening Phase 1.

## Public URLs

Use the custom domain as the canonical public location:

- App: `https://bgg.justathoughtblog.org/`
- Documentation: `https://bgg.justathoughtblog.org/docs/`
- Alpha: `https://bgg.justathoughtblog.org/alpha/`
