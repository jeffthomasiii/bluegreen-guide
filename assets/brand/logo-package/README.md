# BlueGreen Guide Logo Package

This folder is the clean home for the refined BlueGreen Guide brand-logo package.

## Package status

The package is being staged and reviewed before BlueGreen Guide is repointed to these assets.

**Already created in this branch:**

- editable source/master SVGs
- source reference PNG
- PWA/mobile app icons
- folder structure for the final SVG, PNG, and favicon exports

**Still to upload from the prepared logo package:**

- production logo variants in `svg/`
- matching transparent raster exports in `png/`
- favicon exports in `favicons/`

Do **not** delete or overwrite the older files directly under `assets/brand/` yet. The app will be repointed to the approved package in a separate controlled PR after review.

## Canonical design direction

The refinement standard is the approved Option B2 landscape identity.

Preserve:

- rounded landscape badge
- mountain / land / water composition
- BlueGreen Guide wordmark
- approved blue and green palette
- activity-neutral permanent brand identity
- `Discover Better Outdoors` tagline where appropriate

Activity-specific equipment or people belong in the Wayfinding System, not the permanent logo.

## Folder structure

### `source/` — created

Editable/master artwork and reference material.

Included:

- `bluegreen-guide-logo-master.svg` — editable primary master with live brand typography
- `bluegreen-guide-mark-master.svg` — editable icon-only landscape mark
- `bluegreen-guide-logo-master-reference.png` — raster reference for visual comparison

The SVG files are the working source masters. The PNG is a reference image, not the authoritative editable artwork.

If a print/vendor copy requires font-independent artwork, convert the live wordmark/tagline type to outlines in Illustrator for that delivery copy. Keep an editable master with live type.

### `svg/` — upload prepared files here

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

### `png/` — upload prepared files here

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

### `app-icons/` — created

Square-safe brand-mark exports for the PWA, mobile home screen, and other app-icon uses.

Included:

- `bluegreen-guide-app-icon.svg` — scalable app-icon source
- `bluegreen-guide-app-icon-1024.png` — high-resolution master raster
- `bluegreen-guide-app-icon-512.png` — standard PWA large icon
- `bluegreen-guide-app-icon-192.png` — standard PWA small icon
- `bluegreen-guide-app-icon-maskable-512.png` — maskable-safe 512px export

The app-icon artwork intentionally uses a safe background rather than relying on transparency so it behaves predictably when installed on mobile platforms.

A transparent 1024px app-icon export may be kept as a supplemental design asset, but it is not required for the PWA manifest.

### `favicons/` — upload prepared files here

Small-size simplified brand-mark exports.

Expected filenames:

- `bluegreen-guide-favicon.svg`
- `bluegreen-guide-favicon-16x16.png`
- `bluegreen-guide-favicon-32x32.png`
- `bluegreen-guide-favicon-48x48.png`
- `bluegreen-guide-favicon-180x180.png`
- `bluegreen-guide-favicon-192x192.png`
- `bluegreen-guide-favicon-512x512.png`

## Approved color references

- Primary Blue — `#176F8F`
- Deep Blue — `#0F4F67`
- Soft Blue — `#DCEFF5`
- Green Accent — `#6F8F63`
- Deep Green — `#4F7047`
- Background — `#EEF6F8`
- Text — `#10252E`

## Naming

Use lowercase kebab-case. Every production logo asset should begin with `bluegreen-guide-`.

## Integration rule

Complete and review this package first. Repoint the PWA manifest, app header, documentation, favicon references, social/profile assets, and any other product usage only after the new package is approved.
