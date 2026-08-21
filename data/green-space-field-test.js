(() => {
  const request = new XMLHttpRequest();
  request.open("GET", "data/green-space-field-test.json", false);
  request.send(null);

  if (request.status && (request.status < 200 || request.status >= 300)) {
    throw new Error(`Green-space field-test data request failed: ${request.status}`);
  }

  const fieldTestPlaces = JSON.parse(request.responseText);
  const basePlaces = Array.isArray(window.LAUNCH_POINTS) ? window.LAUNCH_POINTS : [];
  const existingIds = new Set(basePlaces.map((place) => place.id));

  window.LAUNCH_POINTS = [
    ...basePlaces,
    ...(Array.isArray(fieldTestPlaces)
      ? fieldTestPlaces.filter((place) => !existingIds.has(place.id))
      : []),
  ];
})();
