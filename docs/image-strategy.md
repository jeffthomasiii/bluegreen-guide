# Image Strategy

BlueGreen Guide should use real, location-relevant outdoor photography whenever the source and reuse terms are clear.

## Current Rule

- Use one primary photo per place in the current interface.
- Use `photoStatus: location` only when the image is confirmed to depict the named place.
- For records that name a specific cove, beach, launch, access point, or recreation area, the photo must depict that specific place before it can be labeled a location photo.
- A broad lake, reservoir, harbor, park, garden, or reserve record may use an image confirmed to depict that named place, but the photo must not be treated as proof of a specific launch, access route, amenity, rule, or current condition.
- Use the app-level representative image fallback when a suitable location photo has not been verified.
- Every public image must include source/creator and license metadata.
- Attribution is not permission. Do not use a copyrighted image unless its reuse license or public-domain status is explicit.
- Prefer public-domain or CC0 imagery when quality is comparable, followed by attribution licenses that permit reuse.
- Do not add multiple unused images to a record merely because they are available. A multi-photo gallery should be implemented as a deliberate product feature later.

## Photo Object

Each place may include one primary item in `photoUrls`:

```json
{
  "photoStatus": "location",
  "photoUrls": [
    {
      "url": "https://example.com/image.jpg",
      "alt": "Clear description of the actual place",
      "credit": "Photographer or source",
      "creditUrl": "https://example.com/source-page",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0/"
    }
  ],
  "photoNotes": "Source and reuse terms reviewed on YYYY-MM-DD."
}
```

## Source Priority

1. Original BlueGreen Guide photography
2. Verified actual-place public-domain or CC0 photography
3. Verified actual-place Creative Commons photography with complete attribution
4. Official agency or owner photography where reuse is explicitly permitted
5. Clearly credited representative imagery as a temporary fallback

Do not assume that an image on a government, tourism, marina, resort, social-media, or business website is reusable. Verify the individual asset's terms.

## Future Gallery

If BlueGreen Guide later adds galleries, multiple verified location photos can be stored and displayed with per-image attribution. Until then, choose the single image that best represents the place and keep the data intentionally simple.
