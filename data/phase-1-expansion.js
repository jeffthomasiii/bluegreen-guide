// BlueGreen Guide Phase 1 content expansion.
// Loaded after launch-points.js and before app.js so it can extend the seed dataset
// without duplicating the canonical JSON file. All new and enriched records remain
// marked Needs verification until a complete official-source review is finished.

(() => {
  const existing = Array.isArray(window.LAUNCH_POINTS) ? window.LAUNCH_POINTS : [];

  const additions = [
    {
      id: "baby-beach-dana-point",
      name: "Baby Beach (Mother's Beach)",
      aliases: ["Baby Beach", "Mother's Beach Dana Point", "Dana Point Mother's Beach"],
      region: "Orange County",
      state: "CA",
      lat: 33.4609,
      lng: -117.6947,
      waterBody: "Dana Point Harbor",
      spaceType: "blue",
      placeTypes: ["harbor-beach"],
      activityTypes: ["paddle-launch", "kayak-launch"],
      amenityTypes: ["parking", "restrooms", "picnic-area"],
      attributeTypes: ["beginner-friendly", "family-friendly", "calm-water", "scenic-view"],
      waterType: "Protected harbor beach",
      activities: ["SUP", "Kayak"],
      skillLevel: "Beginner",
      difficulty: 1,
      popularity: 4.7,
      bestTime: "Morning",
      amenities: ["Parking Nearby", "Restrooms Nearby", "Picnic Areas", "Food Nearby"],
      tags: ["Dana Point Harbor", "calm water", "family friendly", "beginner favorite", "harbor paddle", "scenic"],
      description:
        "A small protected beach inside Dana Point Harbor, commonly called both Baby Beach and Mother's Beach. It is often considered for beginner and family paddling, but users should verify current launch rules, parking, water quality, harbor traffic, and operating conditions before going.",
      verificationStatus: "Needs verification",
      lastVerified: null,
      sourceUrls: [
        { label: "Dana Point Harbor", url: "https://danapointharbor.com/" },
        { label: "City of Dana Point Beaches", url: "https://www.danapoint.org/department/general-services/parks/beaches" }
      ],
      sourceNotes:
        "Baby Beach and Mother's Beach refer to the same Dana Point Harbor location, so BlueGreen Guide uses one canonical record with aliases. Confirm current hand-launch access, parking, restrooms, water quality, harbor rules, wind, tides, and traffic through official sources."
    },
    {
      id: "newport-dunes",
      name: "Newport Dunes Waterfront Resort & Marina",
      region: "Orange County",
      state: "CA",
      lat: 33.6157,
      lng: -117.8932,
      waterBody: "Newport Harbor",
      spaceType: "blue",
      placeTypes: ["harbor-beach", "marina"],
      activityTypes: ["paddle-launch", "kayak-launch"],
      amenityTypes: ["parking", "restrooms", "rentals", "food-nearby"],
      attributeTypes: ["beginner-friendly", "family-friendly", "calm-water"],
      waterType: "Protected harbor lagoon",
      activities: ["SUP", "Kayak"],
      skillLevel: "Beginner",
      difficulty: 1,
      popularity: 4.6,
      bestTime: "Morning",
      amenities: ["Paid Parking", "Restrooms", "Rentals", "Food Nearby", "Beach Access"],
      tags: ["Newport Harbor", "calm water", "family friendly", "beginner favorite", "harbor paddle", "resort access"],
      description:
        "A protected waterfront setting within Newport Harbor with beach and marina services. Access, launch permissions, day-use charges, rentals, and operating hours may be controlled by the resort and should be checked before arrival.",
      verificationStatus: "Needs verification",
      lastVerified: null,
      sourceUrls: [
        { label: "Newport Dunes Waterfront Resort & Marina", url: "https://www.newportdunes.com/" },
        { label: "City of Newport Beach Harbor Information", url: "https://www.newportbeachca.gov/government/departments/harbor" }
      ],
      sourceNotes:
        "Verify public day-use availability, private-equipment launch rules, parking and access fees, rental hours, restrooms, harbor traffic, tides, wind, and water quality directly with Newport Dunes and official harbor sources."
    },
    {
      id: "sunset-aquatic-park",
      name: "Sunset Aquatic Park",
      region: "Orange County",
      state: "CA",
      lat: 33.7258,
      lng: -118.0711,
      waterBody: "Huntington Harbour",
      spaceType: "blue",
      placeTypes: ["marina", "harbor-access"],
      activityTypes: ["kayak-launch", "paddle-launch"],
      amenityTypes: ["parking", "restrooms", "boat-ramp"],
      attributeTypes: ["harbor-access", "needs-verification"],
      waterType: "Harbor marina and channels",
      activities: ["SUP", "Kayak"],
      skillLevel: "Intermediate",
      difficulty: 3,
      popularity: 3.9,
      bestTime: "Early morning",
      amenities: ["Parking", "Restrooms", "Boat Ramp", "Marina"],
      tags: ["Huntington Harbour", "harbor paddle", "boat traffic", "launch rules vary", "needs verification"],
      description:
        "A marina and launch facility on Huntington Harbour. It may provide access to protected channels, but paddlers must verify whether hand launching is currently allowed and understand ramp fees, parking, vessel traffic, and site rules before using it.",
      verificationStatus: "Needs verification",
      lastVerified: null,
      sourceUrls: [
        { label: "OC Parks - Sunset Aquatic Marina", url: "https://www.ocparks.com/sunset-aquatic-marina" },
        { label: "City of Huntington Beach Harbors and Beaches", url: "https://www.huntingtonbeachca.gov/departments/community_services/beaches-piers-harbors/" }
      ],
      sourceNotes:
        "Do not assume the motorized boat ramp authorizes SUP or kayak hand launches. Check OC Parks for current access, launch rules, fees, parking, hours, restrooms, harbor traffic, and closures."
    },
    {
      id: "long-beach-marine-stadium",
      name: "Long Beach Marine Stadium",
      region: "Los Angeles County",
      state: "CA",
      lat: 33.7566,
      lng: -118.1315,
      waterBody: "Alamitos Bay",
      spaceType: "blue",
      placeTypes: ["rowing-basin", "bay-access"],
      activityTypes: ["kayak-launch", "paddle-launch", "rowing"],
      amenityTypes: ["parking", "restrooms"],
      attributeTypes: ["scenic-view", "open-water-awareness"],
      waterType: "Marine stadium and bay channel",
      activities: ["SUP", "Kayak", "Canoe"],
      skillLevel: "Intermediate",
      difficulty: 3,
      popularity: 4.1,
      bestTime: "Early morning",
      amenities: ["Parking", "Restrooms Nearby", "Shoreline Access"],
      tags: ["Alamitos Bay", "scenic", "rowing", "harbor paddle", "boat traffic", "wind aware"],
      description:
        "A historic rowing venue connected to Alamitos Bay. Its broad course can be appealing for experienced paddlers, but launch access, event restrictions, wind exposure, vessel traffic, and designated-use rules should be checked before planning a trip.",
      verificationStatus: "Needs verification",
      lastVerified: null,
      sourceUrls: [
        { label: "City of Long Beach - Marine Stadium", url: "https://www.longbeach.gov/park/marine/marine-stadium/" },
        { label: "City of Long Beach Marine Bureau", url: "https://www.longbeach.gov/park/marine/" }
      ],
      sourceNotes:
        "Verify legal hand-launch locations, parking, events, rowing activity, vessel traffic, water quality, wind, hours, and any temporary restrictions with the City of Long Beach."
    }
  ];

  const overrides = {
    "huntington-harbour": {
      waterBody: "Huntington Harbour",
      spaceType: "blue",
      placeTypes: ["harbor-channels"],
      activityTypes: ["paddle-launch", "kayak-launch"],
      amenityTypes: ["parking", "rentals-nearby"],
      attributeTypes: ["beginner-friendly", "calm-water", "scenic-view"],
      tags: ["Huntington Harbour", "channels", "protected", "calm water", "harbor paddle", "scenic"]
    },
    "mothers-beach-huntington-beach": {
      waterBody: "Huntington Harbour",
      spaceType: "blue",
      placeTypes: ["harbor-beach"],
      activityTypes: ["paddle-launch", "kayak-launch"],
      amenityTypes: ["limited-parking"],
      attributeTypes: ["beginner-friendly", "calm-water", "needs-verification"]
    },
    "alamitos-bay": {
      waterBody: "Alamitos Bay",
      spaceType: "blue",
      placeTypes: ["bay"],
      activityTypes: ["paddle-launch", "kayak-launch"],
      amenityTypes: ["parking", "restrooms", "rentals"],
      attributeTypes: ["beginner-friendly", "calm-water", "scenic-view"],
      tags: ["Alamitos Bay", "bay", "rentals", "calm water", "harbor paddle", "scenic", "boat traffic"]
    },
    "mothers-beach-long-beach": {
      waterBody: "Alamitos Bay",
      spaceType: "blue",
      placeTypes: ["protected-beach"],
      activityTypes: ["paddle-launch", "kayak-launch"],
      amenityTypes: ["parking", "restrooms", "picnic-area"],
      attributeTypes: ["beginner-friendly", "family-friendly", "calm-water"]
    },
    "newport-harbor": { waterBody: "Newport Harbor" },
    "marina-park-newport-beach": { waterBody: "Newport Harbor" },
    "newport-back-bay": { waterBody: "Upper Newport Bay" }
  };

  const enriched = existing.map((place) => ({ ...place, ...(overrides[place.id] || {}) }));
  const existingIds = new Set(enriched.map((place) => place.id));
  window.LAUNCH_POINTS = [...enriched, ...additions.filter((place) => !existingIds.has(place.id))];

  window.BLUEGREEN_COLLECTIONS = [
    {
      id: "beginner-favorites",
      name: "Beginner Favorites",
      description: "Lower-difficulty places that may suit newer paddlers after current conditions and rules are checked.",
      query: "beginner favorite",
      placeIds: [
        "baby-beach-dana-point",
        "newport-dunes",
        "marina-park-newport-beach",
        "mothers-beach-long-beach",
        "alamitos-bay",
        "mission-bay",
        "carlsbad-lagoon"
      ]
    },
    {
      id: "family-friendly",
      name: "Family Friendly",
      description: "Protected or amenity-supported places commonly considered for family outings; supervision and official rules still apply.",
      query: "family friendly",
      placeIds: [
        "baby-beach-dana-point",
        "newport-dunes",
        "marina-park-newport-beach",
        "mothers-beach-long-beach",
        "carlsbad-lagoon",
        "mission-bay"
      ]
    },
    {
      id: "calm-water",
      name: "Calm Water",
      description: "Protected bays, lagoons, and harbor areas that are often calmer than exposed coastal water. Conditions still vary.",
      query: "calm water",
      placeIds: [
        "baby-beach-dana-point",
        "newport-dunes",
        "huntington-harbour",
        "mothers-beach-long-beach",
        "alamitos-bay",
        "newport-back-bay"
      ]
    },
    {
      id: "harbor-paddles",
      name: "Harbor Paddles",
      description: "Protected-water routes and launch areas where boat traffic, channel rules, tides, and wind should be checked.",
      query: "harbor paddle",
      placeIds: [
        "baby-beach-dana-point",
        "newport-dunes",
        "newport-harbor",
        "marina-park-newport-beach",
        "huntington-harbour",
        "sunset-aquatic-park",
        "alamitos-bay",
        "long-beach-marine-stadium"
      ]
    },
    {
      id: "scenic-views",
      name: "Scenic Views",
      description: "Places selected for landscape, harbor, mountain, or wildlife-viewing appeal.",
      query: "scenic",
      placeIds: [
        "baby-beach-dana-point",
        "huntington-harbour",
        "alamitos-bay",
        "long-beach-marine-stadium",
        "newport-back-bay",
        "big-bear-lake",
        "santa-barbara-harbor"
      ]
    }
  ];
})();
