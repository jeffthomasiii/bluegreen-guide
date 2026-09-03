(() => {
  const request = new XMLHttpRequest();
  request.open("GET", "data/utah-field-test.json", false);
  request.send(null);

  if (request.status && (request.status < 200 || request.status >= 300)) {
    throw new Error(`Utah field-test data request failed: ${request.status}`);
  }

  const parsed = JSON.parse(request.responseText);
  const utahPlaces = Array.isArray(parsed) ? parsed : [];
  const basePlaces = Array.isArray(window.LAUNCH_POINTS) ? window.LAUNCH_POINTS : [];
  const existingIds = new Set(basePlaces.map((place) => place.id));

  window.LAUNCH_POINTS = [
    ...basePlaces,
    ...utahPlaces.filter((place) => !existingIds.has(place.id)),
  ];
})();
