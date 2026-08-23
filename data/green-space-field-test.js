(() => {
  const request = new XMLHttpRequest();
  request.open("GET", "data/green-space-field-test.json", false);
  request.send(null);

  if (request.status && (request.status < 200 || request.status >= 300)) {
    throw new Error(`Green-space field-test data request failed: ${request.status}`);
  }

  const parsed = JSON.parse(request.responseText);
  const fieldTestPlaces = Array.isArray(parsed) ? parsed : [];
  const basePlaces = Array.isArray(window.LAUNCH_POINTS) ? window.LAUNCH_POINTS : [];

  // Some field-test records represent the same real-world place as an existing
  // launch record. Keep one canonical place and merge the blue/green metadata
  // instead of displaying duplicate cards or markers.
  const canonicalIdAliases = new Map([
    ["lake-perris-sra", "lake-perris"],
  ]);

  const arrayFields = [
    "activities",
    "activityTypes",
    "amenities",
    "amenityTypes",
    "attributeTypes",
    "placeTypes",
    "tags",
    "photoUrls",
  ];

  function mergeUnique(base = [], overlay = []) {
    return [...new Set([...(Array.isArray(base) ? base : []), ...(Array.isArray(overlay) ? overlay : [])])];
  }

  function mergeSources(base = [], overlay = []) {
    const merged = [];
    const seen = new Set();
    [...(Array.isArray(base) ? base : []), ...(Array.isArray(overlay) ? overlay : [])].forEach((source) => {
      const key = typeof source === "string" ? source : source?.url;
      if (!key || seen.has(key)) return;
      seen.add(key);
      merged.push(source);
    });
    return merged;
  }

  function mergePlace(base, overlay, canonicalId) {
    const merged = { ...base, ...overlay, id: canonicalId };
    arrayFields.forEach((field) => {
      merged[field] = mergeUnique(base?.[field], overlay?.[field]);
    });
    merged.sourceUrls = mergeSources(base?.sourceUrls, overlay?.sourceUrls);
    merged.paddleRelevant = Boolean(
      base?.paddleRelevant ||
      overlay?.paddleRelevant ||
      merged.activities.some((activity) => ["SUP", "Kayak", "Canoe"].includes(activity))
    );
    return merged;
  }

  const normalizedFieldPlaces = fieldTestPlaces.map((place) => ({
    ...place,
    id: canonicalIdAliases.get(place.id) || place.id,
  }));

  const replacements = new Map(normalizedFieldPlaces.map((place) => [place.id, place]));
  const existingIds = new Set(basePlaces.map((place) => place.id));

  window.LAUNCH_POINTS = [
    ...basePlaces.map((place) => {
      const replacement = replacements.get(place.id);
      return replacement ? mergePlace(place, replacement, place.id) : place;
    }),
    ...normalizedFieldPlaces.filter((place) => !existingIds.has(place.id)),
  ];
})();
