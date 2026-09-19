# BlueGreen Guide Logo Package

This folder is the clean home for the refined BlueGreen Guide brand-logo package.

## Canonical source

The refinement standard is the current approved Option B2 landscape identity. During the logo-package transition, do not treat older files directly under `assets/brand/` as authoritative simply because they already exist.

The new package should preserve:

- the rounded landscape badge
- mountain / land / water composition
- BlueGreen Guide wordmark
- approved blue and green palette
- activity-neutral permanent brand identity
- `Discover Better Outdoors` tagline where appropriate

## Folder structure

### `source/`
Editable/master artwork used to generate final exports.

Recommended uploads:
- `bluegreen-guide-logo-master.svg`
- Illustrator source may be retained here later if desired

### `svg/`
Production-ready scalable logo variants.

Expected filenames:
- `bluegreen-guide-logo-primary.svg`
- `bluegreen-guide-logo-primary-dark-mode.svg`
- `bluegreen-guide-logo-mobile.svg`
- `bluegreen-guide-logo-mobile-dark-mode.svg`
- `bluegreen-guide-logo-horizontal.svg`
- `bluegreen-guide-logo-horizontal-dark-mode.svg`
- `bluegreen-guide-logo-stacked.svg`
- `bluegreen-guide-logo-stacked-dark-mode.svg`
- `bluegreen-guide-mark.svg`
- `bluegreen-guide-logo-one-color-dark.svg`
- `bluegreen-guide-logo-one-color-white.svg`

### `png/`
Transparent raster exports matching the SVG variants.

Expected filenames:
- `bluegreen-guide-logo-primary.png`
- `bluegreen-guide-logo-primary-dark-mode.png`
- `bluegreen-guide-logo-mobile.png`
- `bluegreen-guide-logo-mobile-dark-mode.png`
- `bluegreen-guide-logo-horizontal.png`
- `bluegreen-guide-logo-horizontal-dark-mode.png`
- `bluegreen-guide-logo-stacked.png`
- `bluegreen-guide-logo-stacked-dark-mode.png`
- `bluegreen-guide-mark.png`
- `bluegreen-guide-logo-one-color-dark.png`
- `bluegreen-guide-logo-one-color-white.png`

### `app-icons/`
Square-safe brand-mark exports for PWA, mobile, social/profile, and platform icons.

Expected filenames:
- `bluegreen-guide-app-icon.svg`
- `bluegreen-guide-app-icon-1024.png`
- `bluegreen-guide-app-icon-transparent-1024.png`
- additional platform-specific exports as needed

### `favicons/`
Small-size simplified brand-mark exports.

Expected filenames:
- `bluegreen-guide-favicon.svg`
- `bluegreen-guide-favicon-16x16.png`
- `bluegreen-guide-favicon-32x32.png`
- `bluegreen-guide-favicon-48x48.png`
- `bluegreen-guide-favicon-180x180.png`
- `bluegreen-guide-favicon-192x192.png`
- `bluegreen-guide-favicon-512x512.png`

## Upload rule

Upload refined assets into this package first. Do **not** overwrite or delete the existing files directly under `assets/brand/` until the new package has been reviewed and approved. After approval, the app can be repointed to the new canonical assets in a separate PR.

## Naming

Use lowercase kebab-case. Every production logo asset should begin with `bluegreen-guide-`.
