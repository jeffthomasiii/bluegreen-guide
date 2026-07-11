# BlueGreen Guide Wayfinding System

**Status:** Approved working taxonomy  
**Parent reference:** [Design System 2.0](brand-guide.md)

## Purpose

The Wayfinding System helps users understand what a place is, what they can do there, and what characteristics or services it offers.

It is separate from the permanent BlueGreen Guide logo.

## Core Semantics

### Blue

Use blue for water places and water activities.

Examples:

- Paddle launch
- Kayak launch
- Beach
- Harbor
- Lake
- River
- Lagoon
- Reservoir
- Fishing access
- Boat ramp

### Green

Use green for land places and land activities.

Examples:

- Park
- Trail
- Campground
- Garden
- Forest
- Wildlife area
- Shoreline open space
- Hiking
- Biking

### Neutral

Use neutral styling for amenities, services, and universal attributes.

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
- Food nearby
- Water fountain

## Place, Activity, Amenity, and Attribute

### Place

A destination or environment the user can visit.

Examples: lake, park, beach, trail, harbor, campground.

### Activity

Something the user can do.

Examples: paddle, kayak, hike, bike, fish, camp.

### Amenity

A service or facility available at or near a place.

Examples: parking, restrooms, rentals, picnic tables.

### Attribute

A characteristic describing the experience or suitability of a place.

Examples: scenic, beginner friendly, dog friendly, accessible.

## Shape Language

- Blue places and activities: circular chips and markers
- Green places and activities: rounded-square chips and markers
- Neutral amenities and attributes: outlined or low-emphasis neutral chips

Color supports meaning, but shape and labels must remain understandable without color.

## Suggested Token Names

### Blue place tokens

- `beach`
- `harbor`
- `lake`
- `river`
- `lagoon`
- `reservoir`

### Blue activity tokens

- `paddle-launch`
- `kayak-launch`
- `fishing-access`
- `boat-ramp`

### Green place tokens

- `park`
- `trail`
- `campground`
- `garden`
- `forest`
- `wildlife-area`

### Green activity tokens

- `hiking`
- `biking`
- `camping`
- `birding`

### Neutral amenity tokens

- `parking`
- `restrooms`
- `rentals`
- `picnic-area`
- `food-nearby`
- `water-fountain`

### Neutral attribute tokens

- `scenic-view`
- `dog-friendly`
- `accessible`
- `family-friendly`
- `beginner-friendly`
- `needs-verification`

## Map Marker Rules

- Water place or activity: blue circular marker
- Land place or activity: green rounded-square marker
- Universal amenity or attribute: neutral outlined marker only when useful on the map
- Mixed place: show the most relevant primary place marker and reveal secondary categories in the card or detail panel
- Cluster: primary blue unless the map is filtered to a single category

Do not create a separate permanent color for mixed places.

## Filter Rules

- Group filters by Places, Activities, Amenities, and Attributes.
- Use blue for water-related selected filters.
- Use green for land-related selected filters.
- Use neutral styling for amenities and attributes.
- Include text labels for all filters.
- Do not use color as the only selected-state cue.

## Accessibility Rules

- Maintain accessible contrast.
- Use recognizable silhouettes.
- Avoid thin, intricate icon details.
- Test at 16px, 20px, 24px, 32px, and map-marker sizes.
- Pair ambiguous icons with text.
- Treat accessibility as a neutral universal attribute.

## Governance

Before adding a new icon:

1. Decide whether it is a place, activity, amenity, or attribute.
2. Assign blue, green, or neutral semantics.
3. Select a clear semantic token name.
4. Confirm that the icon remains recognizable at small sizes.
5. Add it to this document before implementing it.

Do not add one-off icons, arbitrary colors, or activity symbols to the permanent brand logo.
