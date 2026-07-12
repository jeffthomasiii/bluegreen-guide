// BlueGreen Guide official-source review layer
// Reviewed: 2026-07-11
//
// This file is loaded after the base and Phase 1 expansion datasets, but before
// app.js. It replaces nonofficial/placeholder source links with official agency,
// park, harbor, marina, or facility sources. A source review does not verify every
// access, fee, parking, condition, or hazard field; records remain Needs verification
// unless a future field-by-field review confirms them.

(() => {
  const points = Array.isArray(window.LAUNCH_POINTS) ? window.LAUNCH_POINTS : [];
  const reviewDate = "2026-07-11";

  const source = (label, url) => ({ label, url });

  const exactSources = {
    "mission-bay": [
      source("City of San Diego - Mission Bay Park", "https://www.sandiego.gov/park-and-recreation/parks/regional/missionbay"),
      source("County of San Diego - Beach and Bay Water Quality", "https://www.sdbeachinfo.com/")
    ],
    "la-jolla-shores": [
      source("City of San Diego - Beaches and Bays", "https://www.sandiego.gov/lifeguards/beaches"),
      source("California Department of Fish and Wildlife - Marine Protected Areas", "https://wildlife.ca.gov/Conservation/Marine/MPAs")
    ],
    "oceanside-harbor": [
      source("City of Oceanside - Harbor", "https://www.ci.oceanside.ca.us/government/development-services/harbor"),
      source("California State Parks - Find a Boating Facility", "https://www.parks.ca.gov/BoatingFacilities")
    ],
    "carlsbad-lagoon": [
      source("City of Carlsbad - Lagoons", "https://www.carlsbadca.gov/departments/environmental-sustainability/coastal-management/lagoons"),
      source("California State Parks - Find a Boating Facility", "https://www.parks.ca.gov/BoatingFacilities")
    ],
    "agua-hedionda": [
      source("City of Carlsbad - Agua Hedionda Lagoon", "https://www.carlsbadca.gov/departments/environmental-sustainability/coastal-management/lagoons"),
      source("California State Parks - Find a Boating Facility", "https://www.parks.ca.gov/BoatingFacilities")
    ],
    "newport-back-bay": [
      source("California Department of Fish and Wildlife - Upper Newport Bay Ecological Reserve", "https://wildlife.ca.gov/Lands/Places-to-Visit/Upper-Newport-Bay-ER"),
      source("City of Newport Beach - Harbor Department", "https://www.newportbeachca.gov/government/departments/harbor")
    ],
    "newport-harbor": [
      source("City of Newport Beach - Harbor Department", "https://www.newportbeachca.gov/government/departments/harbor"),
      source("City of Newport Beach - Harbor Resources and Services", "https://www.newportbeachca.gov/government/departments/harbor/resources-services")
    ],
    "marina-park-newport-beach": [
      source("City of Newport Beach - Marina Park", "https://www.newportbeachca.gov/government/departments/recreation-senior-services/marina-park"),
      source("City of Newport Beach - Sail, Kayak and SUP", "https://www.newportbeachca.gov/government/departments/recreation-senior-services/marina-park/marina-park-sail-kayak-sup"),
      source("City of Newport Beach - Marina Park Parking", "https://www.newportbeachca.gov/government/departments/recreation-senior-services/marina-park/parking")
    ],
    "newport-dunes": [
      source("Newport Dunes Waterfront Resort & Marina - Official Site", "https://www.newportdunes.com/"),
      source("City of Newport Beach - Harbor Department", "https://www.newportbeachca.gov/government/departments/harbor"),
      source("California State Parks - Find a Boating Facility", "https://www.parks.ca.gov/BoatingFacilities")
    ],
    "huntington-harbour": [
      source("City of Huntington Beach - Beaches, Piers and Harbors", "https://www.huntingtonbeachca.gov/departments/community_services/beaches-piers-harbors/"),
      source("Orange County Sheriff - Harbor Patrol", "https://www.ocsheriff.gov/commands-divisions/investigations-special-operations-command/harbor-patrol")
    ],
    "mothers-beach-huntington-beach": [
      source("City of Huntington Beach - Beaches, Piers and Harbors", "https://www.huntingtonbeachca.gov/departments/community_services/beaches-piers-harbors/"),
      source("City of Huntington Beach GIS - Harbor Beaches", "https://gis.huntingtonbeachca.gov/arcgis/rest/services/CityFacilities/MapServer/10")
    ],
    "sunset-aquatic-park": [
      source("OC Parks - Sunset Aquatic Marina", "https://www.ocparks.com/sunset-aquatic-marina"),
      source("Orange County Sheriff - Harbor Patrol", "https://www.ocsheriff.gov/commands-divisions/investigations-special-operations-command/harbor-patrol")
    ],
    "baby-beach-dana-point": [
      source("Dana Point Harbor - Official Site", "https://danapointharbor.com/"),
      source("City of Dana Point - Beaches", "https://www.danapoint.org/department/general-services/parks/beaches"),
      source("Orange County Sheriff - Harbor Patrol", "https://www.ocsheriff.gov/commands-divisions/investigations-special-operations-command/harbor-patrol")
    ],
    "mothers-beach-long-beach": [
      source("City of Long Beach - Marine Bureau", "https://www.longbeach.gov/park/marine/"),
      source("City of Long Beach - Beaches", "https://www.longbeach.gov/park/recreation-programs/aquatics/beaches/")
    ],
    "alamitos-bay": [
      source("City of Long Beach - Marine Bureau", "https://www.longbeach.gov/park/marine/"),
      source("City of Long Beach - Alamitos Bay Marina", "https://www.longbeach.gov/park/marine/marinas/alamitos-bay-marina/")
    ],
    "long-beach-marine-stadium": [
      source("City of Long Beach - Marine Stadium", "https://www.longbeach.gov/park/marine/marine-stadium/"),
      source("City of Long Beach - Marine Bureau", "https://www.longbeach.gov/park/marine/")
    ],
    "cabrillo-beach": [
      source("City of Los Angeles Recreation and Parks - Cabrillo Beach", "https://www.laparks.org/beach/cabrillo"),
      source("Port of Los Angeles - Cabrillo Beach", "https://www.portoflosangeles.org/visit/cabrillo-beach")
    ],
    "channel-islands-harbor": [
      source("County of Ventura - Channel Islands Harbor", "https://www.channelislandsharbor.org/"),
      source("California State Parks - Find a Boating Facility", "https://www.parks.ca.gov/BoatingFacilities")
    ],
    "ventura-harbor": [
      source("Ventura Port District - Ventura Harbor", "https://venturaharbor.com/"),
      source("California State Parks - Find a Boating Facility", "https://www.parks.ca.gov/BoatingFacilities")
    ],
    "santa-barbara-harbor": [
      source("City of Santa Barbara - Waterfront Department", "https://santabarbaraca.gov/government/departments/waterfront"),
      source("City of Santa Barbara - Harbor", "https://santabarbaraca.gov/things-do/waterfront/harbor")
    ],
    "lake-perris": [
      source("California State Parks - Lake Perris State Recreation Area", "https://www.parks.ca.gov/?page_id=651"),
      source("California State Parks - Boating Facility Directory", "https://www.parks.ca.gov/BoatingFacilities")
    ],
    "silverwood-lake": [
      source("California State Parks - Silverwood Lake State Recreation Area", "https://www.parks.ca.gov/?page_id=650"),
      source("California State Parks - Boating Facility Directory", "https://www.parks.ca.gov/BoatingFacilities")
    ],
    "big-bear-lake": [
      source("Big Bear Municipal Water District", "https://www.bbmwd.com/"),
      source("Big Bear Municipal Water District - Lake Use", "https://www.bbmwd.com/lake-use")
    ],
    "castaic-lake": [
      source("Los Angeles County Parks - Castaic Lake State Recreation Area", "https://parks.lacounty.gov/castaic-lake-state-recreation-area/"),
      source("California State Parks - Boating Facility Directory", "https://www.parks.ca.gov/BoatingFacilities")
    ],
    "pyramid-lake-ca": [
      source("California Department of Water Resources - Pyramid Lake", "https://water.ca.gov/What-We-Do/Recreation/Pyramid-Lake"),
      source("California State Parks - Boating Facility Directory", "https://www.parks.ca.gov/BoatingFacilities")
    ],
    "diamond-valley-lake": [
      source("Metropolitan Water District - Diamond Valley Lake", "https://www.mwdh2o.com/diamond-valley-lake/"),
      source("Diamond Valley Lake Marina - Official Site", "https://dvmarina.com/")
    ]
  };

  const regionSources = {
    "San Diego County": [
      source("County of San Diego - Beach and Bay Water Quality", "https://www.sdbeachinfo.com/"),
      source("California State Parks - Boating Facility Directory", "https://www.parks.ca.gov/BoatingFacilities")
    ],
    "Orange County": [
      source("OC Parks - Official Site", "https://www.ocparks.com/"),
      source("Orange County Sheriff - Harbor Patrol", "https://www.ocsheriff.gov/commands-divisions/investigations-special-operations-command/harbor-patrol"),
      source("California State Parks - Boating Facility Directory", "https://www.parks.ca.gov/BoatingFacilities")
    ],
    "Los Angeles County": [
      source("Los Angeles County Parks - Official Site", "https://parks.lacounty.gov/"),
      source("California State Parks - Boating Facility Directory", "https://www.parks.ca.gov/BoatingFacilities")
    ],
    "Ventura County": [
      source("County of Ventura - Parks", "https://www.venturaparks.org/"),
      source("California State Parks - Boating Facility Directory", "https://www.parks.ca.gov/BoatingFacilities")
    ],
    "Santa Barbara County": [
      source("Santa Barbara County Parks", "https://www.countyofsb.org/339/Parks"),
      source("California State Parks - Boating Facility Directory", "https://www.parks.ca.gov/BoatingFacilities")
    ],
    "Inland Empire": [
      source("California State Parks - Boating Facility Directory", "https://www.parks.ca.gov/BoatingFacilities"),
      source("California Department of Water Resources - Recreation", "https://water.ca.gov/What-We-Do/Recreation")
    ],
    "San Bernardino Mountains": [
      source("California State Parks - Boating Facility Directory", "https://www.parks.ca.gov/BoatingFacilities"),
      source("San Bernardino County Regional Parks", "https://parks.sbcounty.gov/")
    ]
  };

  const stateSources = {
    CA: [
      source("California State Parks - Find a Boating Facility", "https://www.parks.ca.gov/BoatingFacilities"),
      source("California State Parks - Non-Motorized Boating", "https://www.parks.ca.gov/?page_id=28755")
    ],
    NV: [
      source("Nevada State Parks - Official Site", "https://parks.nv.gov/"),
      source("Nevada Department of Wildlife - Boating", "https://www.ndow.org/get-outside/boating/")
    ],
    AZ: [
      source("Arizona State Parks - Official Site", "https://azstateparks.com/"),
      source("Arizona Game and Fish - Boating", "https://www.azgfd.com/boating/")
    ]
  };

  const approvedOfficialHosts = [
    ".gov",
    ".us",
    "sandiego.gov",
    "sdbeachinfo.com",
    "ci.oceanside.ca.us",
    "carlsbadca.gov",
    "newportbeachca.gov",
    "huntingtonbeachca.gov",
    "danapointharbor.com",
    "danapoint.org",
    "ocparks.com",
    "ocsheriff.gov",
    "longbeach.gov",
    "laparks.org",
    "portoflosangeles.org",
    "channelislandsharbor.org",
    "venturaharbor.com",
    "santabarbaraca.gov",
    "parks.ca.gov",
    "wildlife.ca.gov",
    "water.ca.gov",
    "parks.lacounty.gov",
    "bbmwd.com",
    "mwdh2o.com",
    "dvmarina.com",
    "venturaparks.org",
    "countyofsb.org",
    "parks.sbcounty.gov",
    "parks.nv.gov",
    "ndow.org",
    "azstateparks.com",
    "azgfd.com",
    "newportdunes.com"
  ];

  const isApprovedOfficialUrl = (value) => {
    try {
      const hostname = new URL(value).hostname.toLowerCase();
      return approvedOfficialHosts.some((allowed) =>
        allowed.startsWith(".") ? hostname.endsWith(allowed) : hostname === allowed || hostname.endsWith(`.${allowed}`)
      );
    } catch {
      return false;
    }
  };

  const dedupe = (items) => {
    const seen = new Set();
    return items.filter((item) => {
      if (!item || !item.url || !isApprovedOfficialUrl(item.url)) return false;
      const key = item.url.replace(/\/$/, "").toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  window.LAUNCH_POINTS = points.map((place) => {
    const exact = exactSources[place.id] || [];
    const region = regionSources[place.region] || [];
    const state = stateSources[place.state] || [];
    const retainedOfficial = Array.isArray(place.sourceUrls)
      ? place.sourceUrls.filter((item) => item && isApprovedOfficialUrl(item.url))
      : [];

    // Prefer exact facility sources. Use regional or state directories only when
    // an exact location page has not yet been identified.
    const sourceUrls = dedupe(
      exact.length ? [...exact, ...retainedOfficial] : [...retainedOfficial, ...region, ...state]
    ).slice(0, 3);

    const coverage = exact.length ? "location-specific official sources" : "official regional/state source directories";
    const priorNote = typeof place.sourceNotes === "string" ? place.sourceNotes : "";
    const uncertaintyNote =
      "Source authority was reviewed, but access, legal hand-launch points, fees, parking, amenities, hours, closures, water quality, weather, wind, tides, vessel traffic, and hazards still require a current trip-specific check.";

    return {
      ...place,
      sourceUrls,
      sourceReviewDate: reviewDate,
      sourceReviewStatus: exact.length ? "Official location source added" : "Official directory source added",
      verificationStatus: place.verificationStatus === "Verified" ? "Verified" : "Needs verification",
      sourceNotes: `Official-source pass completed ${reviewDate} using ${coverage}. ${uncertaintyNote}${priorNote ? ` Previous note: ${priorNote}` : ""}`
    };
  });
})();
