# AGENTS.md

## Project Overview

BlueGreen Guide is a static, map-first outdoor discovery and wayfinding proof of concept.

The current product focuses on paddleboarding and kayaking launch points. The broader product direction includes both blue spaces and green spaces, but Phase 1 is closed and Phase 2 is on hold.

Current architecture:

- HTML.
- CSS.
- Browser JavaScript.
- Leaflet 1.9.4.
- OpenStreetMap.
- Canonical JSON place data.
- Small Node.js maintenance scripts.
- GitHub Pages.
- GitHub Actions validation.

Do not introduce a framework, backend, database, account system, live-data integration, community layer, or AI feature unless the user explicitly approves a phase or architecture change.

## Source-of-Truth Order

When sources conflict, use this order:

1. Current executable code and canonical data.
2. Root `README.md` for repository status.
3. `docs/phase-roadmap.md` for phase scope.
4. `docs/data-model.md` and `docs/development-workflow.md`.
5. Other current repository documentation.
6. `chatgpt-project/` reference files.
7. Historical plans and conversation context.

Do not silently reconcile contradictions. State the discrepancy and follow the higher-priority source.

## Repository Structure

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
├── assets/
│   ├── brand/
│   └── icons/
├── data/
│   ├── launch-points.json
│   ├── launch-points.js
│   └── collections.js
├── scripts/
│   ├── build-launch-data-js.js
│   ├── consolidate-launch-data.js
│   └── validate-repo.js
├── docs/
├── chatgpt-project/
└── .github/
    └── workflows/
        └── validate.yml
````

### Important files

* `data/launch-points.json` — authoritative place data.
* `data/launch-points.js` — generated file; never edit directly.
* `data/collections.js` — curated collections using exact place IDs.
* `app.js` — core map, filter, card, detail, and geolocation behavior.
* `collections-ui.js` — curated collection UI and active collection state.
* `ui-refresh.js` — Design System enhancement and runtime function overrides.
* `index.html` — DOM structure and critical CSS/JavaScript load order.
* `docs/development-workflow.md` — maintenance and verification workflow.
* `docs/source-verification.md` — source hierarchy and verification rules.
* `docs/brand-guide.md` — approved Design System 2.0 rules.
* `docs/phase-roadmap.md` — approved product scope.
* `README.md` — authoritative repository status summary.

## Setup and Development Commands

### Prerequisites

* Git.
* Node.js 22 recommended.
* Python 3.
* Modern browser.
* Internet connection for external map, font, library, and image resources.

### Clone

```bash
git clone https://github.com/jeffthomasiii/bluegreen-guide.git
cd bluegreen-guide
```

There is no `package.json` and no dependency-install command.

### Local server

macOS/Linux:

```bash
python3 -m http.server 8080
```

Windows:

```powershell
py -m http.server 8080
```

Open:

```text
http://localhost:8080
```

### Data generation

After editing `data/launch-points.json`:

```bash
node scripts/build-launch-data-js.js
```

### Repository validation

```bash
node scripts/validate-repo.js
```

### Whitespace verification

```bash
git diff --check
```

## Required Verification Commands

Before considering a change complete, run:

```bash
node scripts/validate-repo.js
git diff --check
```

If canonical place data changed, run this first:

```bash
node scripts/build-launch-data-js.js
```

Then rerun validation.

There are no configured unit, browser, lint, formatting, or type-check commands.

## Architecture and Coding Conventions

### Preserve the static architecture

* Use plain HTML, CSS, and JavaScript.
* Do not add package dependencies for changes that can be completed simply.
* Do not add a framework or build pipeline without approval.
* Keep the repository GitHub Pages compatible.
* Do not depend on server-side code or secrets.

### Preserve script load order

Current order in `index.html`:

```html
<script src="data/launch-points.js"></script>
<script src="data/collections.js"></script>
<script src="app.js"></script>
<script src="collections-ui.js"></script>
<script src="ui-refresh.js"></script>
```

`ui-refresh.js` replaces functions defined by `app.js`. Test carefully if either file changes.

### Preserve CSS load order

The CSS files are cumulative override layers. Do not reorder or remove one without checking the full application at desktop, tablet, and mobile sizes.

### Canonical data rules

* Edit `data/launch-points.json`.
* Never edit `data/launch-points.js` directly.
* Use stable, unique place IDs.
* Keep collection `placeIds` synchronized with canonical IDs.
* Keep numeric values inside validator-supported ranges.
* Use HTTPS source URLs.
* Preserve official source labels.
* Keep taxonomy tokens consistent with existing values.
* Regenerate and validate after every canonical data change.

### Collection rules

* Curated collections use explicit `placeIds`.
* Do not restore query-based collection membership without approval.
* Every referenced ID must exist.
* Avoid duplicate IDs within a collection.

### UI and brand rules

Approved identity: Option B2 landscape brand mark.

Do not add activity-specific equipment, people, animals, paddlers, kayaks, or hikers to the permanent logo.

Wayfinding semantics:

* Blue — water places and water activities.
* Green — land places and land activities.
* Neutral — amenities, services, and universal attributes.

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

Use:

* Inter for product UI, documentation, labels, and body copy.
* Cormorant Garamond sparingly for approved brand/editorial uses.

Do not introduce arbitrary category colors or one-off icon semantics.

### Safety and source wording

Never invent or overstate:

* Legal access.
* Launch legality.
* Parking.
* Fees or permits.
* Hours or closures.
* Restrooms or rentals.
* Accessibility.
* Tides or wind.
* Water quality.
* Hazards.
* Verified photography.

Use the established language when information is uncertain:

* `Unknown`
* `Needs verification`
* `Check official source`
* `Conditions vary`

An official source link does not automatically verify every field.

Set `lastVerified` only when material place details were actually checked.

Set `photoStatus: location` only when the image is confirmed to show the named place.

### Data-layer separation

Do not mix:

* Static place facts.
* Live conditions.
* Environmental context.
* Derived or curated guidance.

`bestTime`, `difficulty`, `skillLevel`, and `popularity` are planning and comparison guidance. They are not live measurements or safety guarantees.

### Documentation synchronization

When behavior, fields, labels, or screenshots change, review:

* Root `README.md`.
* Public HTML documentation.
* Maintainer Markdown documentation.
* `chatgpt-project/` references when project-level guidance changes.
* `docs/changelog.md` for release-worthy changes.

Do not expose raw `.md` links from the public HTML documentation site.

## Testing Expectations

Automated validation is necessary but not sufficient.

Manually verify affected behavior using the local server.

At minimum, review:

* Initial map load and size.
* Marker rendering.
* Search.
* Region filter.
* Skill filter.
* Activity filter.
* Maximum-difficulty filter.
* Map-bounds filtering.
* Curated collection selection and clearing.
* Result counts.
* Place cards.
* Detail panel opening and closing.
* Source links.
* Verification language.
* Representative-image labels and credits.
* Browser geolocation when relevant.
* Desktop layout.
* Tablet layout.
* Mobile layout.
* Keyboard focus and interaction when UI controls change.
* Public documentation navigation.

Do not claim browser behavior was verified unless it was actually exercised.

## Definition of Done

A change is complete only when:

* It stays within the approved phase and requested scope.
* Canonical data and generated data are synchronized.
* Source and verification claims are supported.
* Brand and wayfinding semantics remain consistent.
* No new broken internal links are introduced.
* `node scripts/validate-repo.js` passes.
* `git diff --check` passes.
* Relevant browser behavior has been manually reviewed.
* Desktop, tablet, and mobile layouts remain usable.
* Documentation is updated when public behavior or data semantics changed.
* No secrets or credentials were added.
* The final summary identifies:

  * Files changed.
  * Commands run.
  * Results.
  * Anything not verified.

## Security and Privacy Requirements

* Never commit secrets, credentials, tokens, API keys, or real `.env` values.
* Do not add client-side secrets; all browser code is public.
* Do not add tracking, analytics, cookies, accounts, or persistent user identifiers without explicit approval.
* Do not persist or transmit browser geolocation without an approved requirement and privacy review.
* Keep external links protected with appropriate `rel` attributes when opening new tabs.
* Keep official source URLs on HTTPS.
* Do not add unlicensed or uncredited images.
* Treat live condition or safety-related integrations as planning aids, never guarantees.

## Generated Files and Destructive Utilities

### Do not edit directly

```text
data/launch-points.js
```

Generate it with:

```bash
node scripts/build-launch-data-js.js
```

### Do not run routinely

```text
scripts/consolidate-launch-data.js
```

This is a Phase 1 migration utility. It rewrites canonical files, modifies `index.html`, and deletes legacy files when present.

No generated directory is currently documented.

## Files Requiring Special Care

### `data/launch-points.json`

The canonical data source. Unsupported factual claims can create safety and trust problems.

### `data/collections.js`

Collection membership depends on stable place IDs.

### `index.html`

Contains the application structure and critical asset load order.

### `app.js` and `ui-refresh.js`

Behavior is split between the baseline implementation and runtime overrides. A change in one may affect the other.

### CSS files

Styles are distributed across cumulative layers. Avoid broad cleanup inside an unrelated feature or defect fix.

### `assets/brand/`

Contains the approved permanent brand identity. Do not redesign, recolor, stretch, or replace logo assets without explicit approval.

### `assets/icons/wayfinding.svg`

New icon names or semantics require a documented Wayfinding System update.

### `.github/workflows/validate.yml`

Changes affect required repository checks. Do not weaken validation to make a failing change pass.

## Git and Pull-Request Conventions

Verified:

* Default branch is `main`.
* Validation runs on pushes and pull requests targeting `main`.
* Merge, squash, and rebase methods are enabled at the repository level.

Not verified:

* Branch naming convention.
* Branch protection rules.
* Required approvals.
* Preferred merge method.
* Release-tag workflow.

Unless explicitly instructed:

* Work on a focused branch.
* Keep commits scoped to one concern.
* Do not mix architecture cleanup with data or content maintenance.
* Do not force-push.
* Do not push directly to `main`.
* Do not commit, push, open a pull request, merge, release, or deploy without user permission.

## Actions Requiring Permission

Ask before:

* Adding a framework, dependency manager, or build tool.
* Adding any package dependency.
* Adding a backend, database, serverless function, or API proxy.
* Adding accounts, analytics, tracking, reviews, payments, community features, or AI.
* Starting Phase 2 or a later roadmap phase.
* Adding live weather, wind, tide, water-quality, or hazard data.
* Changing the approved brand logo, palette, typography, or wayfinding semantics.
* Adding a new icon category or arbitrary color token.
* Marking a place `Verified` without clear evidence.
* Marking an image `location` without confirmation.
* Deleting or renaming stable place IDs.
* Changing the expected place or collection counts in validation as part of an unapproved expansion.
* Running `scripts/consolidate-launch-data.js`.
* Changing GitHub Actions, Pages configuration, or branch settings.
* Deleting public documentation or brand assets.
* Committing, pushing, opening a pull request, merging, tagging, releasing, or deploying.

## Known Environmental Limitations

* The app is static and cannot safely hide credentials.
* There is no package manifest or lockfile.
* There is no automated browser test suite.
* There is no automated accessibility test suite.
* There is no configured linter, formatter, or type checker.
* Runtime map, font, Leaflet, and representative-image resources require internet access.
* Browser geolocation availability and permission behavior vary by browser and context.
* GitHub Pages cannot provide server-side application behavior.
* Exact Pages settings, branch protection, and required review rules were not independently verified.

## Handling Contradictions

When documentation and code disagree:

1. Confirm the current branch and file contents.
2. Treat executable code and canonical data as the implementation truth.
3. Treat `README.md` as the current status authority.
4. Check the roadmap and development workflow before expanding scope.
5. Do not implement historical plans solely because they appear in old documentation or conversations.
6. Document the contradiction in the work summary.
7. Fix documentation when code is intentionally correct.
8. Fix code only when the documented behavior is current, approved, and supported by the repository.
9. Never resolve safety or verification uncertainty by guessing.
10. Ask for direction when the conflict would change scope, architecture, brand governance, or factual claims.

```
```
