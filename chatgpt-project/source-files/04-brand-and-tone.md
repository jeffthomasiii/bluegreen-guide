# Brand and Tone

## Design System Status

**BlueGreen Guide Design System 2.0 is the approved brand direction.**

The approved concept is **Option B2**: a timeless landscape-based brand mark paired with a separate activity and place wayfinding system.

## Brand Name

BlueGreen Guide

## Tagline

**Discover Better Outdoors**

Use the tagline selectively in larger brand lockups, covers, launch screens, and promotional material. It is not required in compact headers, favicons, map markers, or small UI placements.

## Brand Meaning

The name connects two kinds of outdoor environments:

- **Blue spaces:** water-centered outdoor places
- **Green spaces:** natural or planted outdoor places

The identity should communicate outdoor discovery, practical guidance, and the relationship between water and land.

## Two-Layer Identity

### 1. Brand identity

The permanent brand logo represents BlueGreen Guide itself.

The approved mark should include a simplified landscape using:

- A rounded vertical badge
- Mountain or land forms
- A green shoreline, field, or path
- Blue water
- No paddleboarder, kayak, human figure, or activity-specific equipment

The logo must remain relevant as the product expands into trails, parks, gardens, campgrounds, wildlife areas, routes, and other outdoor experiences.

### 2. BlueGreen Guide Wayfinding System

The secondary identity communicates specific content inside the product.

- **Blue:** water places and water activities
- **Green:** land places and land activities
- **Neutral:** amenities, services, and universal attributes

Examples:

| System | Examples |
| --- | --- |
| Blue places and activities | Paddle launch, kayak launch, harbor, lake, river, beach, fishing access |
| Green places and activities | Trail, park, campground, garden, forest, wildlife area, biking |
| Neutral amenities and attributes | Scenic view, dog friendly, accessibility, parking, restrooms, rentals, family friendly |

Do not force Scenic View, Dog Friendly, Accessibility, or similar universal characteristics into blue or green. They apply across environments and remain neutral.

## Shape Language

Color should support meaning but never carry meaning alone.

Recommended visual cues:

- Blue category icons: circular chips or markers
- Green category icons: rounded-square chips or markers
- Neutral icons: outline or low-emphasis neutral chips
- Always pair unfamiliar icons with labels
- Maintain readable contrast and recognizable silhouettes at small sizes

## Color Palette

Blue remains the primary brand color. Green is the natural-space accent. Neutral colors support universal information.

| Token | Name | Hex | Use |
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

Do not introduce arbitrary category colors. Hazard, warning, or status colors may be added only as functional accessibility tokens and must not alter the core brand palette.

## Typography

### Brand and editorial headings

**Preferred:** Cormorant Garamond

Use for:

- Brand wordmark development
- Large marketing headlines
- Editorial or presentation headings

The final logo artwork should be optically adjusted and exported as approved artwork rather than recreated with live type in product code.

### UI and body copy

**Preferred:** Inter

Use for:

- Navigation
- Filters
- Buttons
- Cards
- Place details
- Documentation body copy
- Metadata and labels

Recommended web stack:

```css
font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Use serif typography sparingly in functional interfaces. Clarity and mobile readability take priority.

## Logo System

Required assets:

1. Primary logo
2. Horizontal logo
3. Stacked logo
4. Icon-only brand mark
5. One-color dark logo
6. One-color white/reversed logo
7. Simplified favicon/app-icon mark

### Logo rules

- Use the landscape brand mark as the permanent identity.
- Keep activity icons out of the logo.
- Do not stretch, rotate, recolor, outline, bevel, or add shadows.
- Do not place the full-color logo directly over a busy photograph.
- Maintain clear space equal to at least one-quarter of the mark width.
- Use the simplified mark below 32px.
- Do not use a category icon as the primary brand logo.

## UI Direction

The app should feel:

- Map-first
- Clean
- Calm
- Modern
- Elegant without feeling exclusive
- Outdoor-oriented
- Useful
- Trustworthy
- Safety-aware
- Inclusive

The interface should not feel like:

- A generic wellness app
- A medical or therapy product
- A hardcore or extreme-adventure brand
- A rustic campground directory
- A flashy social network

## Component Language

### Map markers

- Blue circular marker: water place or activity
- Green rounded-square marker: land place or activity
- Neutral outlined marker: universal amenity or attribute where map display is necessary
- Cluster markers should use the primary blue unless filtered to a single category

### Filter chips

- Use soft blue backgrounds for selected water filters
- Use soft green backgrounds for selected land filters
- Use white or neutral backgrounds for amenities and attributes
- Include text labels; do not rely on color alone

### Cards and detail panels

- Use white or near-white panels
- Use restrained borders and shadows
- Prioritize place name, location, verification, suitability, and practical details
- Keep universal attributes visually secondary to the place category

### Buttons

- Primary action: Primary Blue
- Secondary action: white or soft blue with a blue border
- Avoid using green for routine primary actions; reserve it for land semantics or appropriate positive states

## Responsive Product Direction

### Desktop

Use a map-first layout with filters or navigation at the side and a place-detail panel adjacent to the map.

### Tablet

Use a collapsible filter panel, visible map, and compact result list.

### Mobile

Keep the map reachable, use bottom navigation, and present filters and place details as sheets or stacked panels.

### Watch

Limit the experience to quick actions and glanceable information such as nearby places, saved places, conditions, and active-trip guidance. Do not attempt to reproduce the full desktop experience.

## Voice

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
- Vague wellness slogans
- Unsupported safety claims
- Overstated health benefits
- Extreme-adventure language
- Absolute statements about access or conditions without verification

## Photography

Use real, location-relevant outdoor photography whenever possible.

Priorities:

1. Verified photos of the actual place
2. Official agency or permitted source images
3. Clearly credited representative images as temporary placeholders

Photography should feel calm, realistic, useful, and attainable. Avoid highly staged lifestyle imagery, extreme action shots, unsafe behavior, heavy filters, or imagery that misrepresents a place.

## Governance

- New icons must be added to the Wayfinding System before product use.
- New colors require a documented semantic purpose and accessibility review.
- Brand-logo changes require an explicit design-system revision.
- Product features should use category and attribute tokens rather than one-off styling.
- The canonical detailed reference is `docs/brand-guide.md`.
