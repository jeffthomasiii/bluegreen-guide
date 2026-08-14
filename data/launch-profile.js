(() => {
  const useLevelFromPopularity = (value) => {
    if (value >= 4.7) return "Very High";
    if (value >= 4.2) return "High";
    if (value >= 3.7) return "Moderate";
    return "Low";
  };

  const textFor = (launch) => [
    launch.name,
    launch.waterType,
    launch.description,
    ...(launch.tags || []),
    ...(launch.amenities || []),
  ].join(" ").toLowerCase();

  const windSensitivityFor = (launch) => {
    const text = textFor(launch);
    if (text.includes("very wind sensitive") || text.includes("big water") || text.includes("open water")) return "High";
    if (text.includes("wind sensitive") || text.includes("wind aware") || text.includes("coastal") || text.includes("surf")) return "High";
    if (text.includes("protected") || text.includes("cove") || text.includes("lagoon") || text.includes("harbor channels")) return "Low";
    return "Moderate";
  };

  const stagingSpaceFor = (launch) => {
    const text = textFor(launch);
    if (text.includes("limited parking") || text.includes("small") || text.includes("marina") || text.includes("boat ramp")) return "Limited";
    if (text.includes("large parking") || text.includes("large sandy") || text.includes("beach access") || text.includes("picnic areas")) return "Generous";
    return "Moderate";
  };

  const crowdSensitivityFor = (launch, stagingSpace) => {
    const text = textFor(launch);
    if (text.includes("crowded") || text.includes("busy") || stagingSpace === "Limited") return "High";
    if (launch.popularity >= 4.5 || stagingSpace === "Moderate") return "Moderate";
    return "Low";
  };

  const supSuitabilityFor = (launch, windSensitivity, crowdSensitivity) => {
    if (!(launch.activities || []).includes("SUP")) return "Challenging";
    const text = textFor(launch);
    if (launch.difficulty >= 4 || text.includes("surf launch")) return "Challenging";
    if (launch.difficulty >= 3 || windSensitivity === "High") return "Fair";
    if (launch.difficulty === 1 && windSensitivity !== "High" && crowdSensitivity !== "High") return "Excellent";
    return "Good";
  };

  const enrichLaunch = (launch) => {
    const stagingSpace = launch.stagingSpace || stagingSpaceFor(launch);
    const windSensitivity = launch.windSensitivity || windSensitivityFor(launch);
    const crowdSensitivity = launch.crowdSensitivity || crowdSensitivityFor(launch, stagingSpace);

    return {
      ...launch,
      supSuitability: launch.supSuitability || supSuitabilityFor(launch, windSensitivity, crowdSensitivity),
      windSensitivity,
      useLevel: launch.useLevel || useLevelFromPopularity(Number(launch.popularity) || 0),
      crowdSensitivity,
      stagingSpace,
      assessmentConfidence: launch.assessmentConfidence || "Moderate",
    };
  };

  const launches = Array.isArray(window.LAUNCH_POINTS) ? window.LAUNCH_POINTS : [];
  window.LAUNCH_POINTS = launches.map(enrichLaunch);
  window.BLUEGREEN_ENRICH_LAUNCH = enrichLaunch;
  window.BLUEGREEN_LAUNCH_PROFILE_VERSION = "1.0";
})();
