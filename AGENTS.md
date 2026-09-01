# AGENTS.md

## Project Overview

BlueGreen Guide is a static, map-first outdoor discovery and wayfinding proof of concept for blue spaces and green spaces.

Phase 1 is complete. The current v1.2 field-test build extends the proven launch-map experience with mobile/PWA readiness, the Launch Suitability Profile, generalized place data, and a deliberately small green/mixed field-test pilot. Phase 2 remains on hold.

Current architecture:

- HTML
- CSS
- Browser JavaScript
- Leaflet 1.9.4
- OpenStreetMap
- Canonical JSON place data
- Small Node.js maintenance scripts
- Progressive Web App metadata and service worker
- GitHub Pages on the custom domain `bgg.justathoughtblog.org`
- GitHub Actions validation

Do not introduce a framework, backend, database, account system, live-data integration, community layer, or AI feature unless the user explicitly approves a phase or architecture change.

## Source-of-Truth Order

When sources conflict, use this order:

1. Current executable code and canonical data
2. Root `README.md` for repository status
3. `docs/phase-roadmap.md` for phase scope
4. `docs/data-model.md` and `docs/development-workflow.md`
5. Other current repository documentation
6. `chatgpt-project/` reference files
7. Historical plans and conversation context

Do not silently reconcile contradictions. State the discrepancy and follow the higher-priority source.

## Current Repository Structure

```text
.
├── index.html
├── app.js
├── collections-ui.js
├── ui-refresh.js
├── styles.css
├── design-system.css
├── phase-1-expansion.css
├── brand-refresh.css
├── ui-refresh.css
├── ui-responsive-fixes.css
├── mobile-ux.css
├── mobile-compact.css
├── mobile-layout-polish.css
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
├── alpha/
├── chatgpt-project/
└── .github/
```

### Important files

- `data/places.json` — authoritative base place data
- `data/mission-bay-launch-points.json` — authoritative Mission Bay compatibility/pilot layer
- `data/green-space-field-test.json` — authoritative current green/mixed field-test supplement
- `data/places.js`, `data/mission-bay-launch-points.js`, `data/green-space-field-test.js` — browser/runtime loaders; do not use them as the primary place-fact editing surface
- `data/launch-profile.js` — curated paddle-suitability enrichment only; it does not create or own place records
- `data/collections.js` — curated collections using exact place IDs
- `app.js` — core map, filter, card, detail, and geolocation behavior
- `index.html` — DOM structure and critical CSS/JavaScript load order
- `service-worker.js` — versioned app-shell cache; review cache version when shipped assets change
- `docs/development-workflow.md` — maintenance and verification workflow
- `docs/source-verification.md` — source hierarchy and verification rules
- `docs/brand-guide.md` — approved Design System 2.0 rules
- `docs/phase-roadmap.md` — approved product scope
- `README.md` — authoritative repository status summary

## Setup and Development Commands

Prerequisites: Git, Node.js 22 recommended, Python 3, modern browser, and an internet connection for map tiles and external resources.

```bash
git clone https://github.com/jeffthomasiii/bluegreen-guide.git
cd bluegreen-guide
```

There is no `package.json` and no dependency-install command.

Start a local server:

```bash
python3 -m http.server 8080
```

Windows:

```powershell
py -m http.server 8080
```

Open `http://localhost:8080`.

After changing canonical place JSON:

```bash
node scripts/build-place-data-js.js
node scripts/validate-repo.js
```

Also run:

```bash
git diff --check
```

There are no configured unit, browser, lint, formatting, or type-check commands.

## Current Runtime Model

Repository validation currently resolves **89 unique active runtime places**. The green/mixed field-test layer contains 10 records but contributes nine net-new runtime places because Diamond Valley Lake overlays an existing stable-ID record.

Do not alter expected counts merely to make validation pass. Investigate code/data discrepancies instead.

Keller Trail / Greer Ranch remains outside the dataset pending better verification of the specific trailhead/access point.

## Architecture and Coding Conventions

### Preserve the static architecture

- Use plain HTML, CSS, and JavaScript.
- Do not add dependencies for changes that can be completed simply.
- Do not add a framework or build pipeline without approval.
- Keep the repository GitHub Pages compatible.
- Do not depend on server-side code or secrets.

### Canonical data rules

- Edit the appropriate canonical JSON layer, not retired `launch-points.json` files.
- Use stable, unique place IDs.
- A matching stable ID in the field-test layer may intentionally overlay a base place; do not create duplicates to force counts.
- Keep collection `placeIds` synchronized with runtime IDs.
- Keep taxonomy tokens consistent with the current Data Model.
- Regenerate and validate after canonical place-data changes.
- Do not let `data/launch-profile.js` create or own place records.

### Place semantics

Keep these concepts separate:

- `spaceType`: blue, green, or mixed
- `placeTypes`: what a place is
- `activityTypes`: what people may do there
- amenities/attributes: universal characteristics

Mixed places intentionally qualify for both Water and Land discovery filters.

### UI and brand rules

Approved identity: Option B2 landscape brand mark.

Wayfinding semantics:

- Blue — water places and water activities
- Green — land places and land activities
- Neutral — amenities, services, and universal attributes
- Mixed — represented through relevant blue and green semantics, not a new arbitrary brand color

Color must not be the only source of meaning. Pair it with recognizable icons, shapes, and labels.

Approved core colors:

```css
--blue: #176f8f;
--blue-dark: #0f4f67;
--blue-soft: #dceff5;
--green: #6f8f63;
--green-dark: #4f7047;
--bg: #eef6f8;
--panel: #fbfdff;
--text: #10252e;
--muted: #5a6f78;
--line: #c9dce4;
```

Use Inter for product UI/documentation and Cormorant Garamond sparingly for approved brand/editorial applications.

### Mobile/PWA rules

- Preserve Explore, Map, and Nearby mobile navigation unless a requested UX change explicitly replaces it.
- Keep mobile filters touch-friendly and avoid horizontal-only control discovery when wrapping is practical.
- Do not describe the app as fully offline; map tiles and external/current resources remain network-driven.
- When shipped app-shell assets change, review `service-worker.js` cache versioning so field testers do not remain on stale UI.
- Test responsive behavior across small phones, modern phones, tablets, and breakpoint transitions when UI changes.

### Safety and source wording

Never invent or overstate:

- Legal access
- Launch legality
- Parking
- Fees or permits
- Hours or closures
- Restrooms or rentals
- Accessibility
- Tides or wind
- Water quality
- Fire restrictions or trail conditions
- Hazards
- Verified photography
- Exact access coordinates when only a general facility location is supported

Use established language when uncertain:

- `Unknown`
- `Needs verification`
- `Check official source`
- `Conditions vary`

An official source link does not automatically verify every field.

Set `lastVerified` only when material place details were actually checked. Set `photoStatus: location` only when the image is confirmed to show the named place.

### Data-layer separation

Do not mix:

- Static place facts
- Curated planning guidance
- Live conditions
- Environmental context
- Derived insights

Launch Suitability fields, `bestTime`, `difficulty`, and `skillLevel` are planning guidance. They are not live measurements or safety guarantees.

## Documentation Synchronization

When behavior, fields, labels, URLs, or screenshots change, review:

- Root `README.md`
- Public HTML documentation
- Maintainer Markdown documentation
- `chatgpt-project/` references when project-level guidance changes
- `docs/changelog.md` for release-worthy changes

Preserve historical release records as historical records rather than rewriting old release counts to current totals.

Do not expose raw `.md` links from the public HTML documentation site.

## Testing Expectations

Automated validation is necessary but not sufficient.

Manually review affected behavior using the local server. Depending on the change, check:

- Initial map load and size
- Blue/green/mixed marker rendering
- Search
- Water/Land discovery filters
- Paddle-specific filters where relevant
- Map-bounds filtering
- Curated collections
- Result counts
- Place cards and details
- Launch Suitability display
- Source links and verification language
- Browser geolocation
- Explore/Map/Nearby mobile navigation
- Filter wrapping and mobile sheets
- Desktop, tablet, and mobile layouts
- Keyboard focus when controls change
- Public documentation navigation
- PWA/service-worker refresh behavior when app-shell assets change

Do not claim browser behavior was verified unless it was actually exercised.

## Definition of Done

A change is complete only when:

- It stays within the approved phase and requested scope.
- Canonical and generated/runtime data are synchronized when affected.
- Source and verification claims are supported.
- Brand and wayfinding semantics remain consistent.
- No new broken internal links are introduced.
- `node scripts/validate-repo.js` passes.
- `git diff --check` passes.
- Relevant browser behavior has been manually reviewed when applicable.
- Documentation is updated when public behavior or data semantics changed.
- No secrets or credentials were added.
- The final summary identifies files changed, commands/checks run, results, and anything not verified.

## Security and Privacy Requirements

- Never commit secrets, credentials, tokens, API keys, or real `.env` values.
- Do not add client-side secrets; all browser code is public.
- Do not add tracking, analytics, cookies, accounts, or persistent user identifiers without explicit approval.
- Do not persist or transmit browser geolocation without an approved requirement and privacy review.
- Keep official source URLs on HTTPS.
- Do not add unlicensed or uncredited images.
- Treat future live condition or safety-related integrations as planning aids, never guarantees.

## Generated and Legacy Utilities

Do not restore or edit retired `data/launch-points.json` / `data/launch-points.js` as the current workflow.

Generate current browser place data with:

```bash
node scripts/build-place-data-js.js
```

`scripts/consolidate-launch-data.js` is a legacy migration utility. Do not run it routinely or as part of unrelated maintenance.

## Git and Pull-Request Conventions

- Default branch: `main`
- Work on a focused branch.
- Keep commits scoped to one concern.
- Do not mix architecture cleanup with unrelated data/content maintenance.
- Do not force-push.
- Do not push directly to `main`.
- Do not merge, tag, release, or deploy without user permission.

## Actions Requiring Permission

Ask before:

- Adding a framework, dependency manager, build tool, package dependency, backend, database, serverless function, or API proxy
- Adding accounts, analytics, tracking, reviews, payments, community features, or AI
- Starting Phase 2 or a later roadmap phase
- Adding live weather, wind, tide, water-quality, or hazard data
- Changing the approved brand logo, palette, typography, or wayfinding semantics
- Adding a new icon category or arbitrary color token
- Marking a place `Verified` without clear evidence
- Marking an image `location` without confirmation
- Deleting or renaming stable place IDs
- Changing expected place or collection counts as part of an unapproved expansion
- Running `scripts/consolidate-launch-data.js`
- Changing GitHub Actions, Pages configuration, or branch settings
- Deleting public documentation or brand assets
- Merging, tagging, releasing, or deploying

## Handling Contradictions

When documentation and code disagree:

1. Confirm the current branch and file contents.
2. Treat executable code and canonical data as implementation truth.
3. Treat `README.md` as the current status authority.
4. Check the roadmap and development workflow before expanding scope.
5. Do not implement historical plans solely because they appear in old documentation or conversations.
6. Document the contradiction in the work summary.
7. Fix documentation when code is intentionally correct.
8. Fix code only when the documented behavior is current, approved, and supported by the repository.
9. Never resolve safety or verification uncertainty by guessing.
