(() => {
  const useLevelFromPopularity = (value) => {
    if (value >= 4.7) return "Very High";
    if (value >= 4.2) return "High";
    if (value >= 3.7) return "Moderate";
    return "Low";
  };

  const textFor = (place) => [
    place.name,
    place.waterType,
    place.description,
    ...(place.tags || []),
    ...(place.amenities || []),
  ].join(" ").toLowerCase();

  const windSensitivityFor = (place) => {
    const text = textFor(place);
    if (text.includes("very wind sensitive") || text.includes("big water") || text.includes("open water")) return "High";
    if (text.includes("wind sensitive") || text.includes("wind aware") || text.includes("coastal") || text.includes("surf")) return "High";
    if (text.includes("protected") || text.includes("cove") || text.includes("lagoon") || text.includes("harbor channels")) return "Low";
    return "Moderate";
  };

  const stagingSpaceFor = (place) => {
    const text = textFor(place);
    if (text.includes("limited parking") || text.includes("small") || text.includes("marina") || text.includes("boat ramp")) return "Limited";
    if (text.includes("large parking") || text.includes("large sandy") || text.includes("beach access") || text.includes("picnic areas")) return "Generous";
    return "Moderate";
  };

  const crowdSensitivityFor = (place, stagingSpace) => {
    const text = textFor(place);
    if (text.includes("crowded") || text.includes("busy") || stagingSpace === "Limited") return "High";
    if (place.popularity >= 4.5 || stagingSpace === "Moderate") return "Moderate";
    return "Low";
  };

  const supSuitabilityFor = (place, windSensitivity, crowdSensitivity) => {
    if (!(place.activities || []).includes("SUP")) return "Challenging";
    const text = textFor(place);
    if (place.difficulty >= 4 || text.includes("surf launch")) return "Challenging";
    if (place.difficulty >= 3 || windSensitivity === "High") return "Fair";
    if (place.difficulty === 1 && windSensitivity !== "High" && crowdSensitivity !== "High") return "Excellent";
    return "Good";
  };

  const enrichLaunch = (place) => {
    if (place.paddleRelevant === false) return place;

    const stagingSpace = place.stagingSpace || stagingSpaceFor(place);
    const windSensitivity = place.windSensitivity || windSensitivityFor(place);
    const crowdSensitivity = place.crowdSensitivity || crowdSensitivityFor(place, stagingSpace);

    return {
      ...place,
      supSuitability: place.supSuitability || supSuitabilityFor(place, windSensitivity, crowdSensitivity),
      windSensitivity,
      useLevel: place.useLevel || useLevelFromPopularity(Number(place.popularity) || 0),
      crowdSensitivity,
      stagingSpace,
      assessmentConfidence: place.assessmentConfidence || "Moderate",
    };
  };

  const places = Array.isArray(window.LAUNCH_POINTS) ? window.LAUNCH_POINTS : [];
  window.LAUNCH_POINTS = places.map(enrichLaunch);
  window.BLUEGREEN_ENRICH_LAUNCH = enrichLaunch;
  window.BLUEGREEN_LAUNCH_PROFILE_VERSION = "1.1";
})();
