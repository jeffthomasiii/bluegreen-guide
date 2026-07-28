# BlueGreen Guide Project Context

> Repository inspected: 2026-07-28  
> Repository: `jeffthomasiii/bluegreen-guide`  
> Default branch: `main`
>
> Status labels used below:
>
> - **Verified** — confirmed in the current repository.
> - **Project decision** — established in project documentation and consistent with the repository.
> - **Unverified** — not confirmable from the available repository access.
> - **Inferred** — strongly suggested by the code but not manually reproduced.

## 1. Project Purpose

### Problem being solved

BlueGreen Guide reduces the friction between wanting to spend time outdoors and selecting a practical, suitable place.

The initial proof of concept helps users find paddleboarding and kayaking launch points and understand:

- Where a launch is located.
- What type of water or setting it offers.
- What experience level it may suit.
- What amenities or planning notes are available.
- Which facts still require an official-source check.

### Intended users

The current product serves people planning paddleboarding, kayaking, or canoe outings across the initial California, Nevada, and Arizona dataset.

The longer-term audience includes people discovering both:

- **Blue spaces:** oceans, bays, rivers, lakes, reservoirs, lagoons, and harbors.
- **Green spaces:** parks, trails, gardens, woods, campgrounds, shoreline open space, and wildlife areas.

No narrower user personas are formally defined in the repository.

### Primary goals

- Provide map-first outdoor discovery.
- Present practical, structured place information.
- Support different skill and experience levels.
- Be mobile-friendly and accessible.
- Clearly distinguish verified facts from uncertain information.
- Establish a data and brand foundation that can later expand beyond paddling.
- Remain simple enough to maintain as a static proof of concept.

### Current non-goals

The following are intentionally outside the completed Phase 1 scope:

- Production-grade architecture.
- Accounts, authentication, or user profiles.
- Favorites, reviews, ratings, or community submissions.
- Payments or bookings.
- Live weather, wind, tide, water-quality, or hazard integrations.
- AI recommendations or natural-language trip planning.
- A framework rewrite, database, or production backend.

## 2. Architecture and Technology Choices

### Technology stack

| Area | Current choice | Status |
|---|---|---|
| Markup | HTML5 | Verified |
| Styling | Plain CSS | Verified |
| Application logic | Browser JavaScript | Verified |
| Mapping | Leaflet 1.9.4 | Verified |
| Basemap | OpenStreetMap tiles | Verified |
| Canonical data | JSON | Verified |
| Browser data delivery | Generated JavaScript global | Verified |
| Maintenance scripts | Node.js/CommonJS | Verified |
| Hosting | GitHub Pages | Repository-documented |
| CI | GitHub Actions with Node 22 | Verified |
| Database | None | Verified |
| Backend/API | None | Verified |
| Package manager | None; no `package.json` exists | Verified |

### External runtime integrations

- Leaflet CSS and JavaScript from `unpkg.com`.
- OpenStreetMap raster tiles.
- Google Fonts:
  - Cormorant Garamond.
  - Inter.
- Browser Geolocation API.
- Wikimedia Commons representative-image URLs.
- Creative Commons license and attribution links.
- Official park, city, marina, agency, and facility source URLs stored in place data.

### Environment variables

None are currently required.

Do not introduce secrets or `.env` files into this static client application without an approved architecture change.

### Major components

#### `index.html`

Defines the application shell, map container, filters, curated collections, result cards, detail panel, and script/style load order.

Current JavaScript order:

1. `data/launch-points.js`
2. `data/collections.js`
3. `app.js`
4. `collections-ui.js`
5. `ui-refresh.js`

Do not casually reorder these files. `ui-refresh.js` depends on globals created by `app.js` and replaces some core functions at runtime.

#### `app.js`

Owns the main application state and baseline behavior:

- Leaflet map and tile layer.
- Marker layer.
- Search and filters.
- Map-bounds filtering.
- Geolocation.
- Result cards.
- Place-detail rendering.
- Source and verification presentation.
- Representative-image fallback library.
- HTML escaping helpers.

#### `collections-ui.js`

Renders curated collections and stores the active collection IDs in:

```js
window.BLUEGREEN_ACTIVE_COLLECTION_IDS
````

It triggers filtering by dispatching an `input` event on the search control.

#### `ui-refresh.js`

Applies Design System 2.0 presentation and enhanced behavior:

* Adds wayfinding icons and category classes.
* Expands searchable fields.
* Adds collection filtering to `applyFilters`.
* Replaces marker rendering with blue, green, and neutral semantics.
* Decorates dynamically rendered content through `MutationObserver`.

This runtime override pattern is functional but is technical debt.

#### CSS layers

The application currently loads:

1. `styles.css`
2. `design-system.css`
3. `phase-1-expansion.css`
4. `brand-refresh.css`
5. `ui-refresh.css`
6. `ui-responsive-fixes.css`

Later files may intentionally override earlier rules. Preserve load order unless the styles are deliberately consolidated and regression-tested.

#### Canonical data

* `data/launch-points.json` — authoritative place records.
* `data/launch-points.js` — generated browser copy; do not edit directly.
* `data/collections.js` — curated collection definitions using exact `placeIds`.

#### Maintenance scripts

* `scripts/build-launch-data-js.js` — regenerates the browser data file.
* `scripts/validate-repo.js` — validates data, collections, generated synchronization, scripts, and HTML links.
* `scripts/consolidate-launch-data.js` — Phase 1 migration/closeout utility that rewrites canonical files and removes legacy layers. Do not run during routine maintenance.

#### Documentation

* Public HTML documentation under `docs/`.
* Maintainer Markdown under `docs/`.
* ChatGPT project references under `chatgpt-project/`.
* Root `README.md` is the authoritative repository status summary.

### Why these technologies were selected

**Project decision:** The static architecture supports a low-complexity, GitHub Pages-friendly proof of concept with no deployment service, database, package installation, or secret management.

Consequences:

* The repository is easy to understand and publish.
* Data changes remain reviewable as JSON.
* Hosting costs and infrastructure requirements are minimal.
* Complex live data, accounts, write operations, and personalized features cannot be added safely without a later architecture decision.

## 3. Current Implemented State

### Complete and working

**Verified against repository:**

* v1.1.0 Phase 1 proof of concept.
* 56 canonical launch records.
* Leaflet/OpenStreetMap map.
* Search across names, aliases, regions, water bodies, activities, amenities, tags, descriptions, and wayfinding taxonomy.
* Region, skill, activity, and maximum-difficulty filters.
* Five curated collections using explicit place IDs.
* Map-bounds filtering.
* Browser geolocation.
* Result cards and responsive place details.
* Official-source links and source-review metadata.
* Verification and uncertainty wording.
* Credited representative images.
* Responsive desktop, tablet, and mobile layouts.
* Option B2 brand assets.
* Blue, green, and neutral wayfinding semantics.
* Public Quick Start, Field Guide, Release Notes, and Roadmap pages.
* Canonical data-generation workflow.
* GitHub Actions validation on pushes and pull requests to `main`.

### Partially implemented or intentionally limited

* Most place records remain `Needs verification`.
* Representative images often depict a similar setting rather than the exact launch.
* Ratings and `bestTime` are curated comparison guidance, not measured statistics or live conditions.
* The current content remains primarily paddle-launch focused; broader green-space discovery is represented in the brand and taxonomy but is not the implemented dataset.
* Automated verification covers structural data and links, not browser interaction, accessibility, visual regressions, or source truthfulness.
* Design System 2.0 is applied through several cumulative CSS and JavaScript override layers rather than a consolidated component architecture.

### Planned but not implemented

#### Phase 2 — on hold

A limited structured place-detail pilot may later add normalized fields for:

* Entry or launch type.
* Access notes.
* Parking.
* Fees and permits.
* Restrooms.
* Rentals.
* Dog policy.
* Accessibility.
* Hazards.
* Official links.
* Last verified date.

#### Later roadmap

* Live weather, wind, tide, water temperature, and forecast context.
* Environmental intelligence and advisories.
* Community contributions.
* Personalized or intelligent recommendations.
* Routes, trip planning, clubs, outfitters, and broader blue/green discovery.

These plans do not authorize implementation before the phase is explicitly resumed.

### Branches, pull requests, and issues

* Default branch: `main`.
* No open pull requests were returned by the connected repository.
* No open issues were returned by the connected repository.
* Other branches, branch protection, and merge requirements were not verified.
* v1.1.0 is documented as the current release; GitHub Release/tag state was not independently checked.

## 4. Important Decisions and Rejected Alternatives

### Static architecture instead of a framework/backend

**Decision:** Continue with HTML, CSS, JavaScript, JSON, and GitHub Pages.

**Reasoning:** It is the smallest architecture that proves the product, map, data model, and brand.

**Rejected for the current phase:**

* React, Vue, or another framework.
* A database.
* A production API.
* Authentication.
* A build platform.

**Tradeoff:** Low operational complexity, but limited support for server-side features and increasingly difficult UI composition if override layers continue to grow.

### Canonical JSON plus generated browser JavaScript

**Decision:** Edit `data/launch-points.json` and generate `data/launch-points.js`.

**Reasoning:** JSON remains the authoritative, tool-friendly source while the generated JavaScript supports direct static loading.

**Rejected:** Editing two copies manually or relying only on runtime JSON fetching.

**Tradeoff:** Every data edit requires regeneration and validation.

### Explicit collection membership

**Decision:** Curated collections use exact `placeIds`.

**Reasoning:** Editorial collections remain stable and predictable.

**Rejected:** Text-query-based collection membership.

**Tradeoff:** Collection membership must be maintained manually when places change.

### Two-layer brand identity

**Decision:** Use the Option B2 landscape mark for the permanent brand and a separate wayfinding system for activities, places, amenities, and attributes.

**Rejected:** An activity-specific logo containing a paddler, kayak, hiker, animal, or equipment.

**Tradeoff:** More assets and governance are required, but the brand can expand beyond paddling.

### Blue, green, and neutral semantics

**Decision:**

* Blue represents water places and activities.
* Green represents land places and activities.
* Neutral represents amenities and universal attributes.

Color must be paired with labels, icons, or shapes.

**Rejected:** Arbitrary category colors or assigning cross-environment attributes such as accessibility or dog-friendly to blue or green.

### Safety-aware uncertainty

**Decision:** Use `Unknown`, `Needs verification`, `Check official source`, or `Conditions vary` instead of presenting uncertain facts as confirmed.

**Rejected:** Inferring access, fees, hazards, parking, water quality, or legal launch status from incomplete sources.

**Tradeoff:** Some records feel less complete, but user trust and safety take priority.

### Phase discipline

**Decision:** Phase 1 is closed and Phase 2 is on hold.

**Rejected for maintenance work:** Accounts, community features, live conditions, AI, and broad architecture changes.

**Tradeoff:** Growth is slower, but maintenance remains focused and the proof of concept avoids premature complexity.

### Separate future data layers

**Decision:** Keep place facts, live conditions, environmental context, and derived guidance structurally distinct.

**Reasoning:** These sources have different update frequencies, reliability, and safety implications.

## 5. Known Bugs and Technical Debt

### Most records remain unverified

* **Type:** Known content limitation.
* **Impact:** Users must independently confirm access and conditions.
* **Cause:** An official link does not validate every field.
* **Workaround:** Keep `Needs verification` and direct users to official sources.
* **Priority:** High maintenance priority.

### Representative imagery is often not location-specific

* **Type:** Known content limitation.
* **Impact:** Images may communicate the general setting rather than the exact launch.
* **Cause:** Phase 1 used a small credited fallback library.
* **Workaround:** Clearly display `Representative image`.
* **Priority:** Medium.

### JavaScript and CSS use cumulative override layers

* **Type:** Technical debt.
* **Impact:** Behavior and styling depend on load order; changes are harder to trace and regress.
* **Cause:** Incremental Phase 1 and Design System upgrades.
* **Workaround:** Preserve load order and manually test all major interactions.
* **Priority:** Medium; do not perform a broad rewrite without approval.

### Validation hard-codes 56 places and five collections

* **Type:** Technical debt.
* **Impact:** Legitimate dataset growth fails validation until the expected counts are changed.
* **Cause:** Phase 1 closeout assertions.
* **Workaround:** Update the expected counts intentionally when an approved dataset change occurs.
* **Priority:** Medium before future expansion; low during maintenance-only work.

### No automated browser, accessibility, unit, lint, or type tests

* **Type:** Test coverage gap.
* **Impact:** Interactive and visual regressions may pass CI.
* **Cause:** Lightweight proof-of-concept scope.
* **Workaround:** Perform the documented desktop, tablet, mobile, map, filter, detail, and documentation review.
* **Priority:** Medium.

### Geolocation marker may disappear after filtering

* **Type:** Inferred bug; not manually reproduced.
* **Impact:** The approximate-location marker is added to the same layer that `renderMarkers` clears.
* **Suspected cause:** `markerLayer.clearLayers()` runs whenever filters are applied.
* **Workaround:** Use geolocation after changing filters.
* **Priority:** Low.

### Runtime depends on third-party services

* **Type:** Operational limitation.
* **Impact:** Fonts, map tiles, Leaflet assets, and remote images require network access and their providers to remain available.
* **Workaround:** None currently implemented.
* **Priority:** Low for the proof of concept.

## 6. Development and Deployment Commands

### Prerequisites

* Git.
* Node.js 22 recommended because CI uses Node 22.
* Python 3 for the documented local server.
* A modern browser.
* Internet access for maps, fonts, Leaflet CDN assets, and remote images.

### Initial setup

```bash
git clone https://github.com/jeffthomasiii/bluegreen-guide.git
cd bluegreen-guide
node --version
```

There is no `package.json` and no package-install command.

### Environment configuration

No environment variables are required.

No `.env` file is expected.

### Local development

macOS/Linux:

```bash
python3 -m http.server 8080
```

Windows PowerShell:

```powershell
py -m http.server 8080
```

Open:

```text
http://localhost:8080
```

The repository also states that `index.html` can be opened directly, but the local server is preferred.

### Canonical data generation

After changing `data/launch-points.json`:

```bash
node scripts/build-launch-data-js.js
node scripts/validate-repo.js
```

### Tests

There is no dedicated unit or browser test suite.

Required repository validation:

```bash
node scripts/validate-repo.js
```

Required manual review:

* Desktop, tablet, and mobile layout.
* Map rendering and marker behavior.
* Search and every filter.
* Collection counts and results.
* Cards and place details.
* Source links and verification wording.
* Documentation links and screenshots.

### Linting and formatting

No linter or formatter is configured.

CI performs:

```bash
git diff --check
```

Run it locally before submission:

```bash
git diff --check
```

### Type checking

No type checker is configured.

### Production build

There is no application build step.

The only generated build-like artifact is:

```bash
node scripts/build-launch-data-js.js
```

Do not run `scripts/consolidate-launch-data.js` as a routine build command. It is a destructive Phase 1 migration utility.

### Deployment

There is no deploy CLI command.

The repository documents GitHub Pages as publishing from:

```text
Branch: main
Directory: repository root
```

Changes are deployed after they reach `main`.

**Unverified:** The Pages settings were not independently inspected through the connector.

### Database migrations or seeds

Not applicable. The project has no database.

## 7. Immediate Next Three Tasks

### Task 1 — Complete a focused source-verification maintenance batch

**Objective**

Improve the reliability of a small, explicitly selected group of existing launch records.

**Why next**

Verification is the largest remaining content limitation and directly affects trust and safety.

**Likely files**

* `data/launch-points.json`
* `data/launch-points.js` — generated
* `docs/source-verification.md` only if policy changes
* Public documentation only when user-facing wording changes

**Acceptance criteria**

* Each selected record uses the most specific available official source.
* `sourceReviewDate` reflects review of source authority and relevance.
* `lastVerified` is set only when material place facts were checked.
* Unconfirmed details remain clearly labeled.
* No access, parking, fee, amenity, hazard, water-quality, wind, or tide details are invented.
* Generated data is synchronized.
* `node scripts/validate-repo.js` passes.
* `git diff --check` passes.

**Dependencies and risks**

* The repository does not identify which records should be verified first.
* Official information may be incomplete or change frequently.
* A source review must not be mistaken for full field verification.

### Task 2 — Replace representative imagery for a selected place batch

**Objective**

Replace generic fallback images with confirmed location-specific photography where reuse rights are clear.

**Why next**

The current labels are honest, but location-specific imagery would materially improve usefulness and credibility without expanding product scope.

**Likely files**

* `data/launch-points.json`
* `data/launch-points.js` — generated
* `app.js` only if the fallback library itself changes
* `assets/` if approved images are stored locally
* `docs/image-strategy.md` only if policy changes

**Acceptance criteria**

* `photoStatus: location` is used only for an image confirmed to show the named place.
* Each image includes usable alt text, credit, source URL, license, and license URL where applicable.
* No uncredited copyrighted images are introduced.
* Representative images continue to be labeled accurately.
* Images render in cards and details at desktop and mobile sizes.
* Generated data and validation pass.

**Dependencies and risks**

* Image reuse rights and hotlinking policies must be checked.
* The repository does not specify whether future images should be remote or locally hosted.
* Exact launch-point photos may not be publicly reusable.

### Task 3 — Perform an accessibility and responsive regression pass

**Objective**

Identify and fix high-value defects without changing the application architecture or reopening Phase 1.

**Why next**

CI does not test browser interaction, keyboard behavior, focus handling, responsive layout, or visual regressions.

**Likely files**

* `index.html`
* `app.js`
* `collections-ui.js`
* `ui-refresh.js`
* `styles.css`
* `design-system.css`
* `phase-1-expansion.css`
* `brand-refresh.css`
* `ui-refresh.css`
* `ui-responsive-fixes.css`
* Public documentation screenshots if visible UI changes

**Acceptance criteria**

* Search, filters, collections, bounds filtering, cards, details, and geolocation still work.
* Controls have understandable labels and visible keyboard focus.
* The detail panel can be opened and closed by keyboard.
* No horizontal overflow or unusable map state occurs at representative desktop, tablet, and mobile widths.
* Blue, green, and neutral meanings remain paired with labels/icons/shapes.
* No unsupported safety or verification language is introduced.
* Repository validation and whitespace checks pass.
* Any inferred geolocation-marker issue is either reproduced and fixed or documented as not reproduced.

**Dependencies and risks**

* No formal supported browser/device matrix exists.
* CSS and JavaScript behavior depends on file load order.
* Broad consolidation should be separated from defect fixes.

## 8. Open Questions

1. Which launch records should be prioritized for the next verification pass?
2. Should location-specific images be hosted in the repository or referenced from approved external sources?
3. Is CSS/JavaScript layer consolidation desired during maintenance, or should the current architecture remain untouched until Phase 2?
4. Should validation continue enforcing exactly 56 places and five collections?
5. What browser, device, and accessibility support matrix should be considered required?
6. Are branch protection, pull-request reviews, or a specific merge method required?
7. Are GitHub Pages settings definitely still `main` plus repository root?
8. When, and under what approval criteria, may Phase 2 resume?
9. Should map-marker clustering be evaluated as maintenance or deferred until dataset growth?
10. Should the approximate geolocation marker persist when filters or collections change?

```
```
