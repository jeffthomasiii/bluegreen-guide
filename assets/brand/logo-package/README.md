# BlueGreen Guide Logo Package

This folder is the production home for the refined BlueGreen Guide logo system.

The package is a refinement of the approved Option B2 landscape identity, not a new brand direction. It preserves the rounded landscape badge, mountain/land/water relationship, BlueGreen Guide wordmark, approved blue/green palette, and activity-neutral permanent identity.

## Approved scalable SVG set

Only these SVGs are approved for production use:

- `svg/bluegreen-guide-logo-primary.svg`
- `svg/bluegreen-guide-logo-primary-dark-mode.svg`
- `svg/bluegreen-guide-logo-stacked.svg`
- `svg/bluegreen-guide-logo-stacked-dark-mode.svg`
- `svg/bluegreen-guide-mark.svg`
- `svg/bluegreen-guide-app-icon.svg`

Do not restore or reference deleted experimental SVG variants.

## Approved raster assets

The surviving PNG assets in this package are approved for use where raster artwork is appropriate, including:

- primary and dark-mode lockups
- stacked and stacked dark-mode lockups
- mobile/compact lockups
- horizontal/compact lockups
- icon-only mark
- app icons
- favicons

Mobile and horizontal PNGs are derived compact-use assets. They are not separate SVG masters.

### Provisional PNGs — do not use yet

These two files are intentionally retained for evaluation but are not currently approved for product, documentation, or marketing use:

- `png/bluegreen-guide-logo-one-color-dark.png`
- `png/bluegreen-guide-logo-one-color-white.png`

## Folder roles

### `svg/`

Approved scalable production artwork listed above.

### `png/`

Transparent raster logo variants for raster-only placements and compact interface use.

### `app-icons/`

Square-safe app/PWA icon exports. Use these for installed-app surfaces and manifest PNG entries.

### `favicons/`

Browser favicon and touch-icon exports.

### `source/`

Working source/master material retained for future refinement and vendor handoff.

## Product usage

Use:

- **Primary SVG** for standard light-background web and documentation branding.
- **Primary dark-mode SVG** on dark backgrounds.
- **Stacked SVG** for portrait/square compositions.
- **Stacked dark-mode SVG** for dark portrait/square compositions.
- **Brand mark SVG** for compact icon-only brand placements.
- **App-icon SVG / app-icon PNGs** for PWA and mobile installation surfaces.
- **Mobile PNG** for compact mobile/PWA headers when the full tagline lockup would be too small.
- **Favicons** for browser tabs and touch icons.

The current app shell, PWA manifest, browser icons, and public documentation should reference this package instead of the legacy root-level logo asset.

## Brand rules

- Keep activity-specific equipment and people out of the permanent logo.
- Do not stretch, rotate, recolor, bevel, outline, or add shadows.
- Do not place the full-color logo directly over a busy photograph.
- Preserve clear space around the mark and wordmark.
- Use compact variants rather than shrinking the tagline lockup until it becomes unreadable.
- Keep BlueGreen Guide wayfinding icons separate from the permanent brand logo.

## Brand colors

- Primary Blue: `#176F8F`
- Deep Blue: `#0F4F67`
- Soft Blue: `#DCEFF5`
- Green Accent: `#6F8F63`
- Deep Green: `#4F7047`
- Background: `#EEF6F8`
- Text: `#10252E`

See `docs/brand-guide.md` for the full Design System 2.0 rules and `docs/brand/` on the public documentation site for the approved downloadable logo set.
