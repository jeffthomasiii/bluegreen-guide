# Development Workflow

## Current App Type

Static HTML/CSS/JavaScript app.

## Core Files

- `index.html`
- `styles.css` — Phase 1 base styles and Leaflet fallback rules
- `design-system.css` — Design System 2.0 visual overrides and responsive brand implementation
- `app.js`
- `data/launch-points.json`
- `data/launch-points.js`

Load `design-system.css` after `styles.css` so the approved visual system can evolve without removing the stable Phase 1 layout and Leaflet fallback rules.

## Local Run

Open `index.html`, or run:

```bash
python3 -m http.server 8080
```

Windows:

```powershell
py -m http.server 8080
```

## Deployment Target

GitHub Pages from the repo root.

## Development Principles

- Keep each phase as small and useful as possible.
- Make data-driven changes before hard-coded UI changes.
- Keep the app easy to run without a build process.
- Document major decisions in `/docs`.
- Use GitHub issues for phase tasks.
- Add tooling only when the prototype needs it.
- Preserve mobile usability and map access.
- Do not imply that unverified data is confirmed.

## Design System 2.0 Rules

The approved visual source of truth is `docs/brand-guide.md`.

### Brand identity

- Use the approved Option B2 landscape mark for BlueGreen Guide itself.
- Do not add a paddleboarder, kayaker, trail user, animal, or activity equipment to the permanent logo.
- Do not substitute an activity icon for the brand mark.
- Keep the tagline `Discover Better Outdoors` optional in compact UI.
- The current app uses a lightweight inline SVG interpretation of the B2 mark until final production logo exports are added to `assets/brand/`.

### Wayfinding semantics

- Blue represents water places and water activities.
- Green represents land places and land activities.
- Neutral represents amenities, services, and universal attributes.
- Scenic View, Dog Friendly, Accessibility, Parking, Restrooms, and similar cross-environment concepts remain neutral.
- Color must not be the only cue; use icon shape and text labels.

### Implementation rules

- Define colors as reusable CSS custom properties.
- Use semantic class or token names such as `water`, `land`, `neutral`, `amenity`, and `attribute`.
- Do not hard-code arbitrary colors inside individual components.
- Do not create one-off icons without documenting them in the Wayfinding System.
- Use approved icon names in data rather than embedding presentation logic in records.
- Keep universal amenities visually distinct from place and activity categories.
- Test icons and markers at mobile sizes before merging.
- Maintain accessible contrast and visible keyboard focus states.
- Keep stable structural and Leaflet fallback rules in `styles.css`; place approved visual overrides in `design-system.css` until a future cleanup intentionally consolidates them.

Example token structure:

```css
:root {
  --color-brand-blue: #176f8f;
  --color-brand-blue-dark: #0f4f67;
  --color-brand-blue-soft: #dceff5;
  --color-brand-green: #6f8f63;
  --color-brand-green-dark: #4f7047;
  --color-bg: #eef6f8;
  --color-panel: #fbfdff;
  --color-text: #10252e;
  --color-muted: #5a6f78;
  --color-line: #c9dce4;
}
```

## Responsive Review

Before considering a UI change complete, check:

- Desktop map and detail-panel balance
- Tablet filter and result behavior
- Mobile map access, sheets, cards, and bottom navigation
- Small-screen label and icon readability
- Touch target size
- Whether important verification and caution information remains visible

Watch concepts are future-facing and should remain limited to glanceable actions unless a watch implementation is explicitly added to the roadmap.

## Documentation Workflow

When making a significant product or visual decision:

1. Update the relevant source file in `chatgpt-project/source-files/`.
2. Update `docs/brand-guide.md` when the decision affects brand, typography, color, icons, photography, or UI components.
3. Update `docs/phase-roadmap.md` when the decision changes phase scope or completion status.
4. Record data-model changes before hard-coding new category behavior.
5. Keep README descriptions aligned with the current product direction.
