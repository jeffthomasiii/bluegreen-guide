# Documentation Screenshot Guide

The public Field Guide uses the PNG files in `/docs/screenshots/placeholders`. The directory name is retained for stable links, but the Phase 1 placeholder SVGs have already been replaced by current app screenshots.

## Current Screenshots

| File | Content |
|---|---|
| `home-screen-desktop.png` | Full desktop app with sidebar, map, markers, and cards |
| `search-results-desktop.png` | Search term and matching results |
| `filters-desktop.png` | Filters applied to the launch list |
| `map-marker-popup.png` | Selected map marker and popup |
| `launch-card-desktop.png` | Complete launch card |
| `launch-detail-desktop.png` | Responsive place-detail panel |
| `mobile-home.png` | Mobile app layout |
| `mobile-detail.png` | Mobile detail view |
| `verification-sources.png` | Verification status and source links |

## Capture Guidance

Desktop:

- Use a browser width of approximately 1440 px or wider.
- Use a browser height of approximately 900 px or taller.
- Hide unrelated browser UI where practical.
- Keep the map, filters, and representative content readable.

Mobile:

- Use approximately 390 × 844 px or a comparable modern phone viewport.
- Capture the real responsive layout rather than a scaled desktop screenshot.
- Confirm that the map, controls, cards, and detail panel match the current app.

## Maintenance Rule

Update screenshots when a visible interface change makes the documentation materially inaccurate. Keep the filenames stable so the HTML Field Guide does not need to be relinked.

Before publishing updated screenshots:

1. Confirm no personal browser information is visible.
2. Confirm launch information remains safety-aware and appropriately labeled.
3. Confirm image proportions match the Field Guide layout.
4. Run `node scripts/validate-repo.js` to verify the referenced files still resolve.
