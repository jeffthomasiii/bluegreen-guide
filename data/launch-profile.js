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

  const missionBayChildren = [
    {
      id: "crown-point-mission-bay",
      name: "Crown Point",
      aliases: ["Crown Point Shores", "Crown Point Park"],
      region: "San Diego County",
      state: "CA",
      lat: 32.7836,
      lng: -117.2317,
      waterBody: "Mission Bay",
      waterType: "Protected bay shoreline",
      activities: ["SUP", "Kayak"],
      skillLevel: "Beginner",
      difficulty: 1,
      popularity: 4.7,
      bestTime: "Morning",
      amenities: ["Free Parking", "Restrooms", "Rinse-off Shower", "Picnic Areas", "Boat Launch"],
      tags: ["Mission Bay", "beginner friendly", "large shoreline", "boat launch", "conditions vary"],
      description: "Spacious Mission Bay shoreline with multiple large parking lots and a documented boat launch. The broad park and beach area can make staging easier than at smaller bay access points, though wind and crowding still vary by time and day.",
      supSuitability: "Excellent",
      windSensitivity: "Moderate",
      useLevel: "High",
      crowdSensitivity: "Moderate",
      stagingSpace: "Generous",
      assessmentConfidence: "High",
      verificationStatus: "Needs verification",
      lastVerified: "2026-08-13",
      sourceUrls: [
        { label: "City of San Diego - Crown Point", url: "https://www.sandiego.gov/park-and-recreation/parks/regional/missionbay/crownpoint" },
        { label: "City of San Diego - Mission Bay Beaches", url: "https://www.sandiego.gov/lifeguards/beaches/mbay" },
        { label: "County of San Diego - Beach and Bay Water Quality", url: "https://www.sdbeachinfo.com/" }
      ],
      sourceNotes: "Official source review completed 2026-08-13. City sources document the Crown Point park areas, a boat launch in Crown Point Middle, restrooms, rinse-off shower, large parking lots, and free parking. The map marker is placed on the Crown Point Middle shoreline near the documented launch rather than at the park centroid. BlueGreen Guide suitability, wind sensitivity, crowd sensitivity, staging space, and typical use are curated planning assessments rather than live measurements or safety guarantees. Conditions vary; check current official sources before going.",
      sourceReviewDate: "2026-08-13",
      sourceReviewStatus: "Official location source reviewed"
    },
    {
      id: "de-anza-cove",
      name: "De Anza Cove",
      aliases: ["De Anza Cove Park"],
      region: "San Diego County",
      state: "CA",
      lat: 32.79322,
      lng: -117.20926,
      waterBody: "Mission Bay",
      waterType: "Protected cove",
      activities: ["SUP", "Kayak"],
      skillLevel: "Beginner",
      difficulty: 1,
      popularity: 4.5,
      bestTime: "Morning",
      amenities: ["Free Parking", "Restrooms", "Showers", "Boat Ramp", "Picnic Areas"],
      tags: ["Mission Bay", "protected cove", "beginner friendly", "boat ramp", "summer parking fills", "conditions vary"],
      description: "Protected northeast Mission Bay cove with a documented boat launch ramp, free parking, restrooms, and showers. Its cove setting makes it a strong beginner-oriented option, while other boats and busy summer periods still require awareness.",
      supSuitability: "Excellent",
      windSensitivity: "Low",
      useLevel: "High",
      crowdSensitivity: "Moderate",
      stagingSpace: "Generous",
      assessmentConfidence: "High",
      verificationStatus: "Needs verification",
      lastVerified: "2026-08-13",
      sourceUrls: [
        { label: "City of San Diego - De Anza Cove", url: "https://www.sandiego.gov/park-and-recreation/parks/regional/missionbay/deanzacove" },
        { label: "City of San Diego - Mission Bay Beaches", url: "https://www.sandiego.gov/lifeguards/beaches/mbay" },
        { label: "County of San Diego - Beach and Bay Water Quality", url: "https://www.sdbeachinfo.com/" }
      ],
      sourceNotes: "Official source review completed 2026-08-13. City sources document the boat launch ramp, free parking, nearby restrooms, showers, swimming and boating use, and note that parking can fill early on summer weekends. The map marker uses the mapped De Anza Cove boat-launch access point rather than the broader park centroid. BlueGreen Guide suitability and sensitivity fields are curated planning assessments, not live condition measurements or safety guarantees.",
      sourceReviewDate: "2026-08-13",
      sourceReviewStatus: "Official location source reviewed"
    },
    {
      id: "sail-bay",
      name: "Sail Bay",
      aliases: ["Fanuel Street Park", "Fanuel Park"],
      region: "San Diego County",
      state: "CA",
      lat: 32.7913,
      lng: -117.249,
      waterBody: "Mission Bay",
      waterType: "Protected bay beach",
      activities: ["SUP", "Kayak"],
      skillLevel: "Beginner",
      difficulty: 2,
      popularity: 4.7,
      bestTime: "Early morning",
      amenities: ["Restrooms Nearby", "Showers Nearby", "Beach Access", "Street Parking Nearby"],
      tags: ["Mission Bay", "sandy shoreline", "wind sensitive", "limited adjacent parking", "conditions vary"],
      description: "Popular west-side Mission Bay beach with convenient sandy-water access. It can be appealing for calm-condition SUP, but wind exposure, high use, and the lack of an adjacent parking lot can make the overall launch experience less forgiving than larger Mission Bay parks.",
      supSuitability: "Good",
      windSensitivity: "High",
      useLevel: "Very High",
      crowdSensitivity: "High",
      stagingSpace: "Moderate",
      assessmentConfidence: "High",
      verificationStatus: "Needs verification",
      lastVerified: "2026-08-13",
      sourceUrls: [
        { label: "City of San Diego - Mission Bay Beaches", url: "https://www.sandiego.gov/lifeguards/beaches/mbay" },
        { label: "City of San Diego - Mission Bay Park", url: "https://www.sandiego.gov/park-and-recreation/parks/regional/missionbay" },
        { label: "County of San Diego - Beach and Bay Water Quality", url: "https://www.sdbeachinfo.com/" }
      ],
      sourceNotes: "Official source review completed 2026-08-13. City Mission Bay beach information identifies Sail Bay at Fanuel Street and notes that it does not have an adjacent parking lot. The map marker is placed at the Fanuel Park shoreline/beach access instead of an inland neighborhood point. BlueGreen Guide suitability, wind sensitivity, crowd sensitivity, staging space, and typical use are curated planning assessments rather than live measurements. Conditions vary; check current wind, rules, water quality, and posted restrictions before going.",
      sourceReviewDate: "2026-08-13",
      sourceReviewStatus: "Official location source reviewed"
    }
  ];

  const baseLaunches = Array.isArray(window.LAUNCH_POINTS) ? window.LAUNCH_POINTS : [];
  const existingIds = new Set(baseLaunches.map((launch) => launch.id));
  const combined = [...baseLaunches, ...missionBayChildren.filter((launch) => !existingIds.has(launch.id))];

  window.LAUNCH_POINTS = combined.map(enrichLaunch);
  window.BLUEGREEN_ENRICH_LAUNCH = enrichLaunch;
  window.BLUEGREEN_LAUNCH_PROFILE_VERSION = "1.0";
})();
