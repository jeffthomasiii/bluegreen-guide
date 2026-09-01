# BlueGreen Guide Project Context

> Current repository context refreshed: 2026-09-01  
> Repository: `jeffthomasiii/bluegreen-guide`  
> Default branch: `main`

## 1. Product State

BlueGreen Guide is a static, map-first outdoor discovery and wayfinding proof of concept for blue spaces and green spaces.

Phase 1 is complete. The current **v1.2 field-test build** extends that proof of concept with mobile/PWA readiness, Launch Suitability guidance for paddle-relevant places, generalized place data, and a deliberately small green/mixed pilot. Phase 2 remains on hold.

Current repository validation resolves **89 unique active runtime places**. The green/mixed field-test layer contains 10 records but contributes nine net-new runtime places because Diamond Valley Lake intentionally overlays an existing stable-ID record.

The public app is served through the custom domain:

- App: `https://bgg.justathoughtblog.org/`
- Documentation: `https://bgg.justathoughtblog.org/docs/`
- Alpha: `https://bgg.justathoughtblog.org/alpha/`

## 2. Product Purpose

BlueGreen Guide reduces the friction between wanting to spend time outdoors and choosing a practical place.

It began with paddleboarding and kayaking launch discovery because practical information such as where to stage, launch, park, and what to verify can be difficult to find even when people know where paddling occurs.

The broader product direction includes:

- **Blue spaces:** oceans, bays, rivers, lakes, reservoirs, lagoons, harbors, beaches, and other water-centered places.
- **Green spaces:** parks, trails, gardens, woods, campgrounds, shoreline open space, reserves, and wildlife areas.

The permanent brand identity represents water, land, discovery, and guidance rather than one activity.

## 3. Current Architecture

- HTML5
- Plain CSS
- Browser JavaScript
- Leaflet 1.9.4
- OpenStreetMap
- Canonical JSON place data
- Node.js maintenance/validation scripts
- Progressive Web App manifest
- Versioned service worker
- GitHub Pages
- GitHub Actions validation
- No framework
- No database
- No production backend
- No package manager or `package.json`

Do not introduce a framework, backend, database, account system, community layer, live-data layer, or AI feature unless the approved roadmap and user request require it.

## 4. Canonical Data

Canonical place layers:

- `data/places.json` — authoritative base place records
- `data/mission-bay-launch-points.json` — Mission Bay compatibility/pilot records
- `data/green-space-field-test.json` — current green/mixed field-test supplement

Runtime/browser loaders:

- `data/places.js`
- `data/mission-bay-launch-points.js`
- `data/green-space-field-test.js`

Other runtime data:

- `data/launch-profile.js` — paddle-specific Launch Suitability enrichment only; it does not create or own place records
- `data/collections.js` — curated collection definitions using explicit place IDs

After editing canonical place JSON:

```bash
node scripts/build-place-data-js.js
node scripts/validate-repo.js
```

The retired `data/launch-points.json` / `data/launch-points.js` workflow is no longer current and must not be restored as the canonical maintenance path.

## 5. Place Classification

Keep environment, place type, activity, amenities, and attributes separate.

### `spaceType`

- `blue` — water place or water-centered access point
- `green` — land place or land-centered access point
- `mixed` — meaningful blue-space and green-space characteristics

Mixed places intentionally qualify for both Water and Land discovery filters.

Color is not the only source of meaning. BlueGreen Guide pairs color with recognizable icons, shapes, and labels.

## 6. Mobile/PWA State

v1.2 includes:

- Explore, Map, and Nearby mobile navigation
- Mobile search/filter sheets
- Compact map controls
- Responsive filter wrapping
- Touch-oriented layouts
- PWA metadata and installability
- Versioned service-worker app-shell caching

The app is not fully offline. Map tiles, official-source pages, and other changing external resources remain network-driven.

When shipped app-shell assets change, review the service-worker cache version so testers do not remain on stale UI.

## 7. Launch Suitability

Paddle-relevant places may use:

- SUP Suitability
- Wind Sensitivity
- Typical Use
- Crowd Sensitivity
- Staging Space
- Assessment Confidence

Difficulty, Skill Level, and Best Time remain separate planning signals.

Legacy numeric Popularity may remain internally during migration, but Typical Use and Crowd Sensitivity are the preferred user-facing crowd/use signals.

Launch Suitability fields are curated planning guidance, not live data, official ratings, or safety guarantees.

## 8. Green/Mixed Field-Test Pilot

The current pilot includes 10 records across mixed and green spaces. It is intentionally small.

Its purpose is to test whether the current architecture can support broader outdoor discovery without prematurely starting Phase 2.

Field testing should evaluate:

- Mobile usability
- Water/Land/mixed discovery semantics
- Search and filters
- Marker placement at practical visitor, launch, shoreline, or trail-access locations
- Place-card and detail clarity
- Launch Suitability usefulness where applicable
- Source and verification wording
- Representative photography and image gaps
- Defects and confusing interactions

Keller Trail / Greer Ranch remains outside the dataset until a specific access/trailhead point can be better verified.

## 9. Verification and Safety

Do not invent or overstate:

- Legal access
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

Use:

- `Unknown`
- `Needs verification`
- `Check official source`
- `Conditions vary`

An official link does not automatically verify every field. Verification status describes confidence in available place facts, not whether a destination is safe or suitable.

## 10. Data-Layer Separation

Keep these distinct:

1. Static place facts
2. Curated planning guidance
3. Live/current conditions
4. Environmental context
5. Derived insights

Do not embed temporary closures, current weather, current wind, current tides, or other changing conditions as permanent static place facts.

## 11. Design System 2.0

Approved permanent identity: Option B2 landscape mark.

Wayfinding semantics:

- Blue — water places and water activities
- Green — land places and land activities
- Neutral — amenities, services, and universal attributes
- Mixed — represented through relevant blue and green semantics, not a new arbitrary brand color

Core palette:

- Primary blue `#176f8f`
- Dark blue `#0f4f67`
- Soft blue `#dceff5`
- Green `#6f8f63`
- Dark green `#4f7047`
- Background `#eef6f8`
- Panel `#fbfdff`
- Text `#10252e`
- Muted `#5a6f78`
- Line `#c9dce4`

Use Inter for product UI and documentation. Use Cormorant Garamond sparingly for approved brand/editorial applications.

## 12. Phase Discipline

- Phase 1: complete as of v1.1.0
- v1.2: current mobile/PWA field-test and maintenance build
- Phase 2: on hold
- Later live conditions, environmental intelligence, community features, AI recommendations, and route/ecosystem work remain future roadmap phases

The historical v1.1.0 count of 56 places should remain preserved when describing that release, but it must not be presented as the current runtime total.

## 13. Source-of-Truth Order

When sources conflict:

1. Current executable code and canonical data
2. Root `README.md`
3. `docs/phase-roadmap.md`
4. `docs/data-model.md` and `docs/development-workflow.md`
5. Other current repository documentation
6. `chatgpt-project/` reference files
7. Historical plans and conversation context

Do not silently reconcile contradictions. Follow the higher-priority current source and update stale documentation when appropriate.
