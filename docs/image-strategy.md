# Image Strategy

Phase 1 uses credited representative images to make the prototype feel more complete without implying that every image shows the exact launch point.

The current app includes a small representative image library in `app.js`. Individual launch records can override those defaults later by adding `photoUrls`.

## Current Rule

- Use the app-level representative image fallback when no launch-specific photo is available.
- Use `photoStatus: representative` in the data when a launch record points to a similar blue-space setting but the image is not verified as the exact launch point.
- Use `photoStatus: location` only when a launch record points to an image confirmed to show the specific launch point.
- Every public image must include credit and license metadata.
- Do not use uncredited copyrighted images.

## Photo Object

Each launch point can include `photoUrls`:

```json
{
  "url": "https://example.com/image.jpg",
  "alt": "Kayaker paddling on calm water",
  "credit": "Photographer or source",
  "creditUrl": "https://example.com/source-page",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0/"
}
```

## Upgrade Path

Later phases can replace representative images with:

- user-provided launch photos
- official park, marina, or city photos where reuse is allowed
- original BlueGreen Guide photos
- community-submitted photos after moderation

When a representative image is replaced by a verified launch-point image, update `photoStatus` to `location` and keep the credit metadata.
