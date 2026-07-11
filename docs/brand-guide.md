# BlueGreen Guide — Design System 2.0

**Status:** Approved and locked  
**Primary use:** Brand identity, product UI, documentation, GitHub assets, and future cross-device experiences

---

## 1. Brand Foundation

### Product name

**BlueGreen Guide**

Use the name with a space between **BlueGreen** and **Guide** in user-facing copy.

### Tagline

**Discover Better Outdoors**

Use the tagline in larger lockups, covers, launch screens, and promotional applications. Omit it in compact headers, favicons, map markers, and small UI.

### Brand idea

BlueGreen Guide helps people discover practical outdoor experiences across blue spaces and green spaces. The product begins with paddleboarding and kayaking launch points, but the permanent brand must remain relevant as the guide expands into parks, trails, gardens, campgrounds, wildlife areas, routes, conditions, and trip planning.

The brand should feel:

- Map-first
- Useful
- Calm
- Modern
- Elegant without feeling exclusive
- Outdoor-oriented
- Trustworthy
- Safety-aware
- Inclusive

The brand should not feel:

- Like a medical, therapy, or generic wellness app
- Like an extreme-adventure brand
- Flashy, neon, loud, or overbuilt
- Overly rustic or campground-themed
- Overconfident about safety, access, or conditions

---

## 2. Approved Brand Architecture

BlueGreen Guide uses two coordinated identity layers.

### Layer 1: Brand identity

The approved direction is **Option B2**.

The permanent brand mark is a simplified landscape inside a rounded vertical badge. It should visually connect:

- Blue water
- Green land or shoreline
- Mountains or a natural horizon
- Discovery and guidance

The permanent logo must not contain:

- A paddleboarder
- A kayaker
- A hiker
- A human figure
- Activity-specific equipment
- A single-use place symbol

The logo represents the brand, not the first activity supported by the app.

### Layer 2: BlueGreen Guide Wayfinding System

The secondary identity communicates places, activities, amenities, and attributes inside the product.

- **Blue:** water places and water activities
- **Green:** land places and land activities
- **Neutral:** amenities, services, and universal attributes

Examples:

| System | Examples |
| --- | --- |
| Blue places and activities | Paddle launch, kayak launch, beach, harbor, lake, river, fishing access |
| Green places and activities | Park, trail, campground, garden, forest, wildlife area, biking |
| Neutral amenities and attributes | Scenic view, dog friendly, accessibility, parking, restrooms, rentals, family friendly |

Scenic View, Dog Friendly, Accessibility, and similar cross-environment concepts remain neutral because they can describe blue spaces, green spaces, or both.

---

## 3. Color System

Blue is the primary brand color. Green is the natural-space accent. Neutral colors support universal information and interface structure.

| Token | Name | HEX | Primary use |
| --- | --- | --- | --- |
| `--blue` | Primary Blue | `#176F8F` | Main actions, water categories, active states |
| `--blue-dark` | Deep Blue | `#0F4F67` | Wordmark, headings, dark backgrounds |
| `--blue-soft` | Soft Blue | `#DCEFF5` | Water chips, panels, hover states |
| `--green` | Green Accent | `#6F8F63` | Land categories, shoreline, secondary accents |
| `--green-dark` | Deep Green | `#4F7047` | Dark land-category details |
| `--bg` | Mist Background | `#EEF6F8` | Page and app background |
| `--panel` | Panel White | `#FBFDFF` | Cards and panels |
| `--text` | Deep Text | `#10252E` | Primary body text |
| `--muted` | Muted Slate | `#5A6F78` | Secondary text and neutral icons |
| `--line` | Map Line | `#C9DCE4` | Borders and inactive controls |

### Color rules

- Do not make green the dominant brand color.
- Do not introduce arbitrary category colors.
- Do not rely on color alone to communicate meaning.
- Use icon shape and text labels with color.
- Functional warning or hazard colors may be added only as documented accessibility tokens.
- Avoid neon colors, heavy gradients, bevels, gloss, and decorative effects.

---

## 4. Typography

### Brand and editorial headings

**Preferred:** Cormorant Garamond

Use for:

- Approved wordmark development
- Large brand headlines
- Presentation titles
- Editorial feature headings

The final logo should be exported as approved artwork rather than recreated from live type in the product.

### Product UI and body copy

**Preferred:** Inter

Use for:

- Navigation
- Filters
- Buttons
- Cards
- Place details
- Labels
- Documentation body copy
- Metadata

Recommended web stack:

```css
font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Use serif typography sparingly inside functional interfaces. Readability takes priority.

---

## 5. Logo System

Required assets:

1. Primary logo
2. Horizontal logo
3. Stacked logo
4. Icon-only brand mark
5. One-color dark logo
6. One-color white/reversed logo
7. Simplified favicon and app-icon mark

### Approved construction direction

- Rounded vertical badge
- Simplified mountain or land form
- Green shoreline, field, or path
- Blue water element
- Calm, minimal geometry
- Solid fills rather than thin decorative strokes

### Clear space

Define `X` as the width of the brand mark.

Minimum clear space around the full logo:

```text
X / 4
```

### Minimum digital sizes

| Asset | Minimum size |
| --- | ---: |
| Horizontal logo | 160px wide |
| Primary logo | 180px wide |
| Stacked logo | 140px wide |
| Icon-only mark | 24px |
| Favicon | 16px simplified mark |

### Logo misuse

Do not:

- Add a paddleboarder or activity icon
- Stretch or squash the logo
- Rotate the logo
- Add drop shadows, bevels, or outlines
- Recolor it outside approved versions
- Place the full-color logo directly over a busy photograph
- Use a category icon as the primary brand logo

---

## 6. Wayfinding System

### Semantic groups

#### Blue

Use for water places and activities.

Examples:

- Paddle launch
- Kayak launch
- Beach
- Harbor
- Lake
- River
- Fishing access
- Boat ramp

#### Green

Use for land places and activities.

Examples:

- Park
- Trail
- Campground
- Garden
- Forest
- Wildlife area
- Hiking
- Biking

#### Neutral

Use for amenities, services, and universal attributes.

Examples:

- Scenic view
- Dog friendly
- Accessibility
- Parking
- Restrooms
- Rentals
- Picnic area
- Family friendly
- Beginner friendly

### Shape language

- Blue category icons: circular chips or markers
- Green category icons: rounded-square chips or markers
- Neutral icons: outline or low-emphasis neutral chips
- Pair unfamiliar icons with labels
- Keep silhouettes recognizable at small sizes

### Governance

- Add new icons to the documented system before product use.
- Use semantic names such as `paddle-launch`, `trail`, `parking`, and `accessible`.
- Do not create one-off colors or icons inside individual components.
- Keep activity categories separate from amenities and attributes.

See [Wayfinding System](wayfinding-system.md) for the working taxonomy.

---

## 7. UI Component Direction

### Map markers

- Blue circular marker: water place or activity
- Green rounded-square marker: land place or activity
- Neutral outlined marker: universal amenity or attribute when map display is necessary
- Cluster markers: Primary Blue unless filtered to a single category

### Filter chips

- Soft blue background for selected water filters
- Soft green background for selected land filters
- White or neutral background for amenities and attributes
- Text label required where the icon may be ambiguous

### Cards and panels

- White or near-white surfaces
- Restrained borders and shadows
- Clear hierarchy
- Place name, location, verification, and practical details first
- Amenities and attributes secondary to the place category

### Buttons

- Primary action: Primary Blue
- Secondary action: white or soft blue with blue border
- Green should not replace blue for routine primary actions

---

## 8. Responsive Product Direction

### Desktop

Use a map-first layout with filters or navigation at the side and a place-detail panel adjacent to the map.

### Tablet

Use a collapsible filter panel, visible map, and compact result list.

### Mobile

Keep the map reachable. Use bottom navigation and present filters and place details as sheets or stacked panels.

### Watch

Limit the experience to glanceable information and quick actions such as nearby places, saved places, conditions, and active-trip guidance. Do not reproduce the full desktop interface.

---

## 9. Voice and Tone

The voice should be:

- Useful
- Calm
- Clear
- Concrete
- Safety-aware
- Encouraging
- Specific

Prefer:

- `Check official source`
- `Conditions vary`
- `Needs verification`
- `Last verified [date]`
- `Generally best in the morning`

Avoid:

- Hype
- Generic wellness slogans
- Unsupported safety claims
- Overstated health benefits
- Extreme-adventure language
- Absolute claims about access or conditions without verification

---

## 10. Photography

Use real, location-relevant outdoor photography whenever possible.

Priority order:

1. Verified photos of the actual place
2. Official agency or permitted source images
3. Clearly credited representative images as temporary placeholders

Photography should feel:

- Calm
- Realistic
- Useful
- Attainable
- Location-specific

Avoid:

- Highly staged lifestyle imagery
- Extreme action photography
- Unsafe behavior
- Heavy filters
- Images that misrepresent a place

---

## 11. File Naming and Export

Use lowercase kebab-case in the repo.

Examples:

```text
bluegreen-guide-logo-primary.svg
bluegreen-guide-logo-horizontal.svg
bluegreen-guide-logo-stacked.svg
bluegreen-guide-mark.svg
bluegreen-guide-mark-32.png
```

Preferred folder:

```text
assets/brand/
```

Export formats:

- SVG for scalable web and documentation use
- PNG for social profiles, app icons, and raster-only placements
- PDF for print review and handoff
- AI source file retained outside web delivery assets

---

## 12. Accessibility

- Meet WCAG contrast requirements for text and controls.
- Never rely on blue, green, or neutral color alone.
- Provide visible keyboard focus states.
- Keep touch targets large enough for mobile use.
- Pair icons with labels when meaning is not universally clear.
- Treat accessibility as a universal attribute, not a green-space or blue-space category.

---

## 13. Design Governance

- Brand-logo changes require an explicit design-system revision.
- New icons must be added to the Wayfinding System before implementation.
- New colors require a documented semantic purpose and accessibility review.
- Product features should use semantic tokens instead of one-off styling.
- Documentation, README copy, source files, and UI should remain aligned with this guide.

**Design System 2.0 is the current source of truth for the BlueGreen Guide brand.**
