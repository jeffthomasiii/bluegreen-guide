(() => {
  const request = new XMLHttpRequest();
  request.open("GET", "data/mission-bay-launch-points.json", false);
  request.send(null);

  if (request.status && (request.status < 200 || request.status >= 300)) {
    throw new Error(`Mission Bay place data request failed: ${request.status}`);
  }

  const missionBayPlaces = JSON.parse(request.responseText);
  window.LAUNCH_POINTS = [
    ...(Array.isArray(window.LAUNCH_POINTS) ? window.LAUNCH_POINTS : []),
    ...(Array.isArray(missionBayPlaces) ? missionBayPlaces : []),
  ];
})();
