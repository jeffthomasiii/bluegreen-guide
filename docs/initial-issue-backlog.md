# Initial GitHub Issue Backlog

Use these as starter issues after the repo is pushed to GitHub.

## Phase 1 Refinement

### Improve Mobile Layout

Make the app easier to use on phones by refining the sidebar, filter controls, cards, and map height.

Acceptance criteria:

- Filters remain usable on small screens.
- Map is visible without awkward scrolling.
- Launch cards are readable on mobile.
- No horizontal overflow.

### Add Launch Detail View

Add a simple detail view for a selected launch point.

Acceptance criteria:

- Clicking a card or marker can reveal a fuller detail panel.
- Detail view includes description, amenities, activity, difficulty, popularity, best time, and tags.
- The user can return to the list view.

### Add Verification Fields to Data

Prepare the launch-point data for real-world use by adding fields for verification status.

Acceptance criteria:

- Add `sourceUrls`.
- Add `lastVerified`.
- Add `needsVerification`.
- Existing data remains compatible with the app.

### Add Image Strategy

Decide how launch images will be handled.

Acceptance criteria:

- Document whether images will be user-provided, official-source linked, Unsplash-style placeholders, or generated placeholders.
- Add `photoUrls` and `photoCredits` fields if needed.
- Do not use uncredited copyrighted imagery.

### Improve Map Marker Behavior

Make the map easier to read as the launch dataset grows.

Acceptance criteria:

- Evaluate whether marker clustering is needed.
- Keep difficulty visible where practical.
- Avoid marker overlap in dense coastal areas.

## Phase 2

### Build Place Detail Pages

Create a fuller place view for each launch point.

Acceptance criteria:

- Detail layout works on desktop and mobile.
- Supports future fields such as parking, fees, restrooms, rentals, hazards, and official links.
- Does not require a framework unless the static approach becomes too limiting.

### Add Safety and Access Notes

Add structured safety/access notes without overstating certainty.

Acceptance criteria:

- Add hazards field.
- Add access notes field.
- Add source/verification state.
- Unverified details are clearly marked.

## Phase 3

### Research Weather, Wind, and Tide APIs

Compare API options for conditions-aware planning.

Acceptance criteria:

- Identify free or low-cost weather API options.
- Identify tide API options for coastal launches.
- Note API limits and attribution requirements.
- Recommend one Phase 3 path.
