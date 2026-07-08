# BlueGreen Guide — Official Brand Guide

**Version:** 0.1  
**Status:** Phase 1 proof-of-concept guide  
**Primary use:** Illustrator logo rebuild, static web prototype, GitHub Pages assets

---

## 1. Brand Foundation

### Product name

**BlueGreen Guide**

Use the name with a space between **BlueGreen** and **Guide** in user-facing copy.

Repo filenames may use lowercase kebab-case:

```text
bluegreen-guide-horizontal.svg
bluegreen-guide-stacked.png
bluegreen-guide-mark.svg
```

### Brand idea

BlueGreen Guide helps people find practical outdoor blue-space and green-space experiences, starting with paddleboarding and kayaking launch points.

The brand should feel:

- Map-first
- Useful
- Calm
- Outdoor-oriented
- Trustworthy
- Safety-aware
- Beginner-friendly without feeling childish

The brand should not feel:

- Like a medical, therapy, or generic wellness app
- Like an extreme adventure brand
- Flashy, neon, loud, or overbuilt
- Overly rustic or campground-themed
- Overconfident about safety, access, or conditions

### Visual principle

Use **blue as the primary identity color** because the first use case is water access. Use **green as a secondary natural-space accent** to support the blue/green-space concept.

---

## 2. Color Palette

### Core brand colors

| Token | Name | HEX | RGB | CMYK approx. | Primary use |
|---|---:|---:|---:|---:|---|
| `--blue` | Primary Blue | `#176F8F` | 23, 111, 143 | 84, 22, 0, 44 | Main brand color, logo mark, buttons, active UI, default markers |
| `--blue-dark` | Dark Blue | `#0F4F67` | 15, 79, 103 | 85, 23, 0, 60 | Wordmark, headings, selected states, high-contrast icon details |
| `--blue-soft` | Soft Blue | `#DCEFF5` | 220, 239, 245 | 10, 2, 0, 4 | Logo background panels, badges, hover states |
| `--green` | Green Accent | `#6F8F63` | 111, 143, 99 | 22, 0, 31, 44 | Secondary accent, shoreline/leaf element, beginner-friendly signal |
| `--green-dark` | Dark Green | `#4F7047` | 79, 112, 71 | 29, 0, 37, 56 | Secondary wordmark emphasis, dark green icon details |
| `--bg` | Mist Background | `#EEF6F8` | 238, 246, 248 | 4, 1, 0, 3 | App/page background |
| `--text` | Deep Text | `#10252E` | 16, 37, 46 | 65, 20, 0, 82 | Body text, primary readable copy |
| `--panel` | Panel White | `#FBFDFF` | 251, 253, 255 | 2, 1, 0, 0 | Cards, panels, logo clear backgrounds |
| `--line` | Map Line | `#C9DCE4` | 201, 220, 228 | 12, 4, 0, 11 | Borders, divider lines, inactive controls |
| `--muted` | Muted Slate | `#5A6F78` | 90, 111, 120 | 25, 7, 0, 53 | Secondary text, metadata, helper text |

### Logo color usage

Recommended full-color logo:

- **Icon water element:** Primary Blue `#176F8F`
- **Icon land/leaf/shoreline element:** Green Accent `#6F8F63`
- **Wordmark “BlueGreen”:** Dark Blue `#0F4F67`
- **Wordmark “Guide”:** either Deep Text `#10252E` or Dark Green `#4F7047`

Preferred: use **Dark Blue** for most wordmark text and reserve green for the icon. This keeps the brand calm and avoids making the logo feel too decorative.

### Approved logo color versions

Create these versions in Illustrator:

1. **Full color**
   - Primary Blue + Green Accent + Dark Blue text.
   - Use on light backgrounds.

2. **One-color dark**
   - All elements in Dark Blue `#0F4F67` or Deep Text `#10252E`.
   - Use for documents, small spaces, or where multi-color is too busy.

3. **One-color white/reversed**
   - All elements in white `#FFFFFF`.
   - Use on Primary Blue or Dark Blue backgrounds only.

4. **Icon-only full color**
   - Used for favicon, app icon, social profile, map markers, and compact UI.

### Avoid

- Do not make green the dominant logo color.
- Do not use red/orange as a default safety or hazard color in the logo system.
- Do not use neon blue, electric green, heavy gradients, bevels, or glossy effects.
- Do not use low-contrast green text on light backgrounds.
- Do not place full-color logos on busy photos without a light or dark overlay.

---

## 3. Typography

### Brand typography direction

The type should feel clear, calm, modern, and practical. It should support a map-first utility product, not a lifestyle slogan brand.

### Recommended type system

#### Logo wordmark

**Preferred:** `Nunito Sans SemiBold` or `Nunito Sans Bold`

Why:
- Rounded enough to feel approachable.
- Clean enough for a practical app.
- Less corporate than Inter alone.
- Less rugged than outdoor/adventure display fonts.

Use:
- `BlueGreen` in SemiBold or Bold.
- `Guide` in the same weight or one step lighter.
- Avoid extreme tracking.
- Use title case exactly as: **BlueGreen Guide**.

#### UI and documentation

**Preferred:** `Inter`

Use:
- Headings: Inter SemiBold
- Body: Inter Regular
- Metadata/helper text: Inter Regular or Medium
- Buttons/labels: Inter Medium

#### Fallback stack

For the website/app:

```css
font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

For logo construction in Illustrator, keep the editable `.ai` file with live type, but convert text to outlines for exported SVG logo files if the SVG will be used directly in the repo.

### Typography rules

- Do not use script fonts.
- Do not use distressed, hand-painted, or extreme outdoor display fonts.
- Do not use serif fonts for the logo.
- Keep labels and UI copy easy to read on mobile.
- Avoid all-caps wordmarks unless creating a small utility label, not the main logo.

---

## 4. Logo System Overview

The BlueGreen Guide identity should include four core assets:

1. **Primary logo**
2. **Horizontal logo**
3. **Stacked logo**
4. **Brand mark / icon-only logo**

### Recommended definitions

#### 1. Primary logo

Use this as the preferred brand lockup when there is enough space.

Recommended structure:

- Brand mark on the left.
- Wordmark on the right.
- Wordmark may be two-line:
  - Line 1: **BlueGreen**
  - Line 2: **Guide**
- Balanced, not overly wide.
- Best for documentation covers, splash areas, brand kits, and larger placements.

#### 2. Horizontal logo

Use this for headers, nav bars, repo README graphics, and wide spaces.

Recommended structure:

```text
[mark] BlueGreen Guide
```

- Mark left.
- Wordmark on one line.
- Keep spacing compact but not cramped.
- Best for the web header.

#### 3. Stacked logo

Use this for social images, centered cover art, square spaces, and vertical placements.

Recommended structure:

```text
[mark]

BlueGreen Guide
```

- Mark centered above wordmark.
- Wordmark centered.
- Best for social profile previews, user guide cover, and presentation title slides.

#### 4. Brand mark / icon-only logo

Use this for:

- Favicons
- App icons
- Social avatars
- Map markers
- Small badges
- Mobile homescreen icons

The mark must remain recognizable at 16px–24px. For the smallest icons, remove fine internal details.

---

## 5. Logo Mark Construction Guidance

### Concept

The mark should visually connect:

- Water access
- Natural shoreline / green space
- Map-based discovery
- Calm outdoor usefulness

Recommended visual direction:

A simplified **map-pin or rounded badge mark** containing a blue water shape and a green shoreline/leaf/trail shape.

The mark should be simple enough to work as a favicon and map marker.

### Suggested Illustrator construction

Use a square artboard for the master mark:

```text
Artboard: 1024 × 1024 px
Safe area: 96 px minimum on all sides
Live area: approximately 832 × 832 px
```

Recommended mark proportions:

- Outer shape: 760–820 px tall.
- Internal water/shoreline shape: at least 96 px thick at the thinnest visible point.
- Rounded corners/curves: consistent and soft.
- Avoid tiny white gaps, sharp needles, or thin strokes.

### Shape language

Use:

- Rounded curves
- Soft wave line
- Gentle shoreline curve
- Simple leaf/trail shape only if it remains readable small
- Solid fills

Avoid:

- Detailed paddles, kayaks, mountains, trees, sunbursts, or human figures in the main logo
- Thin outline-only marks
- Overly complex layered icons
- Small text inside the icon
- Busy details that disappear in favicons or markers

### Stroke and fill rules

Preferred:
- Build the mark from filled vector shapes, not strokes.
- Use strokes only during construction, then expand them before final export.
- Use rounded joins and rounded caps when strokes are necessary.
- Keep the final mark visually balanced in a square.

### Pixel-size test

Before finalizing the mark, export test PNGs at:

- 16 × 16
- 24 × 24
- 32 × 32
- 48 × 48
- 180 × 180

The mark passes if the blue/green idea remains recognizable at 24px and the silhouette remains clear at 16px.

---

## 6. Logo Spacing, Clear Space, and Placement

### Clear space

Define **X** as the width of the logo mark.

Minimum clear space around all sides:

```text
X / 4
```

Example:

- If the mark is 64px wide, keep at least 16px of clear space around the full logo.
- For large print or presentation use, increase to `X / 3` when possible.

### Horizontal lockup spacing

For the horizontal logo:

```text
[mark] gap [wordmark]
```

Recommended gap:

```text
X / 5 to X / 4
```

Where `X` is mark width.

Example:
- 64px mark → 13px to 16px gap.

### Stacked lockup spacing

For the stacked logo:

```text
[mark]
gap
[wordmark]
```

Recommended vertical gap:

```text
X / 6 to X / 5
```

Example:
- 160px mark → 27px to 32px gap.

### Minimum sizes

| Logo asset | Minimum digital size | Notes |
|---|---:|---|
| Horizontal logo | 160px wide | Use only if wordmark remains readable |
| Primary logo | 180px wide | Best at medium/large sizes |
| Stacked logo | 140px wide | Good for square placements |
| Icon-only mark | 24px | Use simplified mark below 32px |
| Favicon | 16px | Use icon-only, no text |

### Placement rules

Use the logo:

- Left-aligned in app headers.
- Centered only on covers, splash screens, and social graphics.
- On light backgrounds whenever possible.
- On dark blue backgrounds only with the reversed white version.

Avoid:

- Stretching or squashing.
- Rotating.
- Adding drop shadows to the logo.
- Placing full-color logo over detailed photos.
- Putting the logo too close to screen edges.
- Using the map marker as the main brand logo unless intentionally using the icon-only mark.

---

## 7. Logo File Naming

Use lowercase kebab-case for exported repo assets.

Recommended folder:

```text
/assets/brand/
```

Recommended source folder:

```text
/assets/brand/source/
```

### Source files

```text
/assets/brand/source/bluegreen-guide-logo-master.ai
/assets/brand/source/bluegreen-guide-logo-master.pdf
```

Keep editable live-type files in the source folder. Do not use source files directly in the app.

### Exported SVG files

```text
/assets/brand/bluegreen-guide-primary.svg
/assets/brand/bluegreen-guide-horizontal.svg
/assets/brand/bluegreen-guide-stacked.svg
/assets/brand/bluegreen-guide-mark.svg
/assets/brand/bluegreen-guide-horizontal-white.svg
/assets/brand/bluegreen-guide-stacked-white.svg
/assets/brand/bluegreen-guide-mark-white.svg
```

### Exported PNG files

```text
/assets/brand/bluegreen-guide-primary-1200.png
/assets/brand/bluegreen-guide-horizontal-2048.png
/assets/brand/bluegreen-guide-horizontal-1024.png
/assets/brand/bluegreen-guide-stacked-1200.png
/assets/brand/bluegreen-guide-mark-1024.png
/assets/brand/bluegreen-guide-mark-512.png
/assets/brand/bluegreen-guide-mark-256.png
```

---

## 8. Illustrator Setup

### Master file setup

Create one Illustrator master file with separate artboards:

```text
01-primary-logo
02-horizontal-logo
03-stacked-logo
04-mark
05-mark-small
06-horizontal-white
07-stacked-white
08-mark-white
09-favicon-source
10-map-marker-default
11-map-marker-selected
12-map-marker-cluster
```

### Document settings

Recommended:

- Color mode: RGB
- Color profile: sRGB IEC61966-2.1
- Units: Pixels
- Raster effects: 300 ppi for source, but export web PNGs at required pixel sizes
- Align important icon edges to whole pixels when exporting small icons

### Illustrator export rules

Before exporting:

- Save an editable `.ai` master with live type.
- Duplicate final export artboards.
- Convert export-version text to outlines.
- Expand strokes in the icon/mark.
- Remove unused hidden layers.
- Keep transparent backgrounds for logo PNGs unless a specific background is needed.
- Use consistent artboard padding.

### SVG export settings

Use SVG for the web whenever possible.

Recommended settings:

- Styling: Presentation Attributes or Internal CSS
- Font: Convert to Outlines for logo files
- Images: Preserve, though logo files should not include raster images
- Object IDs: Layer Names
- Decimal places: 2 or 3
- Minify: Yes for production export
- Responsive: Yes
- Include `viewBox`
- Do not include unnecessary editor metadata in production SVG

### PNG export settings

Recommended:

- Background: Transparent
- Color: sRGB
- Anti-aliasing: Art Optimized
- Resolution: Export by pixel dimensions, not print DPI
- File format: PNG-24
- Do not upscale small exports from a raster image; export directly from vector artboards

---

## 9. Export Size Matrix

### Main logo exports

| Asset | SVG | PNG sizes | Use |
|---|---:|---:|---|
| Primary logo | Yes | 1200w, 600w, 300w | Brand guide, docs, repo README, cover areas |
| Horizontal logo | Yes | 2048w, 1024w, 512w, 320w | Website header, user guide, docs |
| Stacked logo | Yes | 1200w, 800w, 512w | Social graphics, cover graphics, centered layouts |
| Mark/icon only | Yes | 1024, 512, 256, 128, 64, 32 | Icons, compact UI, badges, map system |

### Favicons and app icons

Recommended files:

```text
/assets/icons/favicon.svg
/assets/icons/favicon.ico
/assets/icons/favicon-16x16.png
/assets/icons/favicon-32x32.png
/assets/icons/apple-touch-icon.png
/assets/icons/android-chrome-192x192.png
/assets/icons/android-chrome-512x512.png
```

Recommended sizes:

| Asset | Size | Notes |
|---|---:|---|
| `favicon.svg` | Vector | Preferred modern favicon |
| `favicon.ico` | 16, 32, 48 | Multi-size ICO |
| `favicon-16x16.png` | 16 × 16 | Simplified mark only |
| `favicon-32x32.png` | 32 × 32 | Simplified mark only |
| `apple-touch-icon.png` | 180 × 180 | Solid or very simple background; no text |
| `android-chrome-192x192.png` | 192 × 192 | Mark centered with safe area |
| `android-chrome-512x512.png` | 512 × 512 | Mark centered with safe area |

### Social profile and preview exports

Recommended files:

```text
/assets/social/bluegreen-guide-profile-1024.png
/assets/social/bluegreen-guide-profile-512.png
/assets/social/bluegreen-guide-og-1200x630.png
/assets/social/bluegreen-guide-social-square-1080.png
```

Recommended specs:

| Asset | Size | Use |
|---|---:|---|
| Profile avatar | 1024 × 1024 | Source social profile image |
| Profile avatar | 512 × 512 | Web/social upload fallback |
| Open Graph image | 1200 × 630 | Link previews |
| Square social image | 1080 × 1080 | Posts, profile support graphics |

Profile avatar rules:

- Use icon-only mark.
- Keep key details inside a centered circular safe area.
- Do not use full wordmark in the profile avatar.
- Use a soft blue or white background if the platform crops tightly.

### User guide / documentation exports

Recommended files:

```text
/assets/docs/bluegreen-guide-doc-cover-logo.png
/assets/docs/bluegreen-guide-doc-header-logo.png
```

Recommended sizes:

| Asset | Size | Use |
|---|---:|---|
| Documentation cover logo | 1200w PNG or SVG | User guide title/cover |
| Documentation header logo | 512w PNG or SVG | Smaller doc header |

---

## 10. Map Marker System

### Marker principles

The marker system should support Phase 1 without overloading the map.

Markers should:

- Be easy to recognize at mobile size.
- Use blue as the default.
- Use green sparingly as a natural/access accent.
- Avoid implying verified safety unless the data has been verified.
- Avoid too many colors or symbols at once.

### Recommended marker assets

Folder:

```text
/assets/markers/
```

Files:

```text
marker-launch-default.svg
marker-launch-selected.svg
marker-launch-hover.svg
marker-launch-needs-verification.svg
marker-cluster-small.svg
marker-cluster-medium.svg
marker-cluster-large.svg
```

### Marker color rules

| Marker | Fill | Accent | Notes |
|---|---|---|---|
| Default launch | Primary Blue `#176F8F` | White or Soft Blue detail | Standard launch point |
| Selected launch | Dark Blue `#0F4F67` | Green Accent ring/detail | Active selection |
| Hover/focus | Primary Blue | Soft Blue ring | Keyboard/mouse focus |
| Needs verification | Primary Blue outline or Muted Slate | Small neutral badge | Do not use warning red unless there is a confirmed hazard |
| Cluster | Soft Blue fill | Dark Blue number | Keep calm and readable |

### Marker size

Recommended SVG viewBoxes:

| Marker | ViewBox | Display size |
|---|---:|---:|
| Default pin | `0 0 48 64` | 32 × 42 or 36 × 48 |
| Selected pin | `0 0 56 72` | 40 × 52 or 44 × 58 |
| Cluster | `0 0 48 48` | 36 × 36 or 44 × 44 |

PNG fallbacks:

```text
marker-launch-default@1x.png   32 × 42
marker-launch-default@2x.png   64 × 84
marker-launch-default@3x.png   96 × 126

marker-launch-selected@1x.png  40 × 52
marker-launch-selected@2x.png  80 × 104
marker-launch-selected@3x.png  120 × 156
```

### Marker accessibility

- Do not rely on color alone for selected or verification status.
- Use size, stroke/ring, and label state in the UI.
- Ensure popup/card text clearly explains the place details.
- Do not use marker color to imply current water safety or ideal conditions.

---

## 11. UI Icon System

### Icon style

Use simple line or filled icons that match the logo:

- Rounded corners
- Rounded caps
- 2px stroke at 24px icon size
- No sharp decorative details
- No filled multicolor icons inside dense UI controls unless necessary

### Recommended icon sizes

| Use | Size |
|---|---:|
| UI inline icon | 16 × 16 |
| Button icon | 20 × 20 |
| Card metadata icon | 18 × 18 |
| Filter icon | 20 × 20 |
| Feature icon | 24 × 24 |
| Large empty-state icon | 64 × 64 |

### Recommended UI icon names

```text
icon-search.svg
icon-filter.svg
icon-map.svg
icon-list.svg
icon-water.svg
icon-restroom.svg
icon-parking.svg
icon-fee.svg
icon-dog.svg
icon-accessibility.svg
icon-warning-note.svg
icon-source.svg
icon-verified-note.svg
```

Use `icon-warning-note.svg` carefully. It should indicate “check details” or “conditions vary,” not danger unless the data confirms a specific hazard.

---

## 12. Logo Usage in the Current App

### Header

Use:

```text
bluegreen-guide-horizontal.svg
```

Recommended display size:

```css
.logo {
  width: 180px;
  max-width: 52vw;
  height: auto;
}
```

On very small mobile screens, use:

```text
bluegreen-guide-mark.svg
```

or a compact horizontal logo around 140–160px wide.

### Favicon

Use:

```text
favicon.svg
favicon.ico
apple-touch-icon.png
```

The favicon should use the simplified mark only.

### Map marker

Use:

```text
marker-launch-default.svg
```

Do not use the full logo as a map marker.

### Documentation/user guide

Use:

```text
bluegreen-guide-stacked.svg
```

or:

```text
bluegreen-guide-primary.svg
```

for cover/title pages.

---

## 13. Logo Do / Do Not

### Do

- Use the full-color logo on light backgrounds.
- Use the reversed logo on dark blue backgrounds.
- Use icon-only for small sizes.
- Keep clear space around the logo.
- Keep blue dominant and green secondary.
- Use simple, scalable vector shapes.
- Test the mark at favicon size.

### Do not

- Stretch, compress, rotate, skew, or warp the logo.
- Add shadows, bevels, textures, or glossy effects.
- Put the wordmark inside a map marker.
- Use the full horizontal logo as a favicon.
- Place the logo over a busy photo without a plain overlay.
- Change the colors casually per page or feature.
- Use green as the main brand color.
- Use red/orange hazard styling without verified hazard context.
- Add detailed kayak/paddle/person illustrations to the primary mark.

---

## 14. Accessibility and Contrast Notes

- Use Deep Text `#10252E` for body text on light backgrounds.
- Use Dark Blue `#0F4F67` for headings and key labels.
- Avoid Green Accent `#6F8F63` for small text on light backgrounds.
- Use green primarily as a shape/accent, not body copy.
- Avoid text over map imagery unless placed on a solid or translucent panel.
- When status information matters, use text labels in addition to color.

---

## 15. Recommended Repo Structure

```text
/assets/
  /brand/
    bluegreen-guide-primary.svg
    bluegreen-guide-horizontal.svg
    bluegreen-guide-stacked.svg
    bluegreen-guide-mark.svg
    bluegreen-guide-horizontal-white.svg
    bluegreen-guide-stacked-white.svg
    bluegreen-guide-mark-white.svg
    /source/
      bluegreen-guide-logo-master.ai
      bluegreen-guide-logo-master.pdf

  /icons/
    favicon.svg
    favicon.ico
    favicon-16x16.png
    favicon-32x32.png
    apple-touch-icon.png
    android-chrome-192x192.png
    android-chrome-512x512.png

  /markers/
    marker-launch-default.svg
    marker-launch-selected.svg
    marker-launch-hover.svg
    marker-launch-needs-verification.svg
    marker-cluster-small.svg
    marker-cluster-medium.svg
    marker-cluster-large.svg

  /social/
    bluegreen-guide-profile-1024.png
    bluegreen-guide-profile-512.png
    bluegreen-guide-og-1200x630.png
    bluegreen-guide-social-square-1080.png
```

---

## 16. Initial Export Checklist

Before committing logo assets:

- [ ] Master `.ai` file saved in `/assets/brand/source/`.
- [ ] Full-color primary, horizontal, stacked, and mark exported as SVG.
- [ ] White/reversed versions exported as SVG.
- [ ] PNG versions exported at listed sizes.
- [ ] Favicon SVG, ICO, 16px, 32px, Apple Touch, Android 192, Android 512 exported.
- [ ] Social profile and Open Graph images exported.
- [ ] Map marker default and selected assets exported.
- [ ] Small-size icon test completed at 16px, 24px, and 32px.
- [ ] Assets use transparent backgrounds unless intentionally designed otherwise.
- [ ] Filenames use lowercase kebab-case.
- [ ] Logo does not rely on unlicensed fonts in final SVG export.
- [ ] README or docs note added describing brand asset locations.

---

## 17. Phase 1 Recommendation

For the Phase 1 proof of concept, prioritize these assets first:

1. `bluegreen-guide-horizontal.svg`
2. `bluegreen-guide-mark.svg`
3. `favicon.svg`
4. `favicon.ico`
5. `apple-touch-icon.png`
6. `marker-launch-default.svg`
7. `marker-launch-selected.svg`
8. `bluegreen-guide-stacked.svg`
9. `bluegreen-guide-og-1200x630.png`

Everything else can be added after the core logo, favicon, and marker system are stable.
