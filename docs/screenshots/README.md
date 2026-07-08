# Screenshot Replacement Guide

The files in `/docs/screenshots/placeholders` are intentional placeholders. Replace each SVG with a PNG screenshot when the related screen is final.

## General capture settings

Desktop:

- Recommended browser width: 1440 px or wider
- Recommended browser height: 900 px or taller
- Capture without browser bookmarks or unrelated UI if possible
- Keep the app visible and uncluttered

Mobile:

- Recommended size: 390 x 844 or similar
- Use browser responsive mode or a phone screenshot
- Capture the actual mobile layout, not a scaled desktop view

## Replacement checklist

| Placeholder | Replace with | Notes |
|---|---|---|
| `home-screen-desktop.svg` | `home-screen-desktop.png` | Full desktop app with map, sidebar, markers, and cards |
| `search-results-desktop.svg` | `search-results-desktop.png` | Search term entered and matching results visible |
| `filters-desktop.svg` | `filters-desktop.png` | Filters applied with updated results |
| `map-marker-popup.svg` | `map-marker-popup.png` | Marker popup open |
| `launch-card-desktop.svg` | `launch-card-desktop.png` | One complete card |
| `launch-detail-desktop.svg` | `launch-detail-desktop.png` | Detail panel open |
| `mobile-home.svg` | `mobile-home.png` | Mobile top-of-app view |
| `mobile-detail.svg` | `mobile-detail.png` | Mobile detail panel |
| `verification-sources.svg` | `verification-sources.png` | Verification and source links visible |
| `future-photo-example.svg` | `future-photo-example.png` | Real launch photo example |

## Naming rule

Keep the filenames stable. The documentation expects these names. When a final PNG exists, update the Markdown image reference from `.svg` to `.png` if you want the final screenshot to display instead of the placeholder.
