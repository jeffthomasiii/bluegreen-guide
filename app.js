const state = {
  allLaunches: [],
  filteredLaunches: [],
  markers: new Map(),
  showOnlyBounds: false,
  selectedLaunchId: null,
};

const map = L.map("map", {
  zoomControl: true,
  preferCanvas: true,
}).setView([36.15, -118.65], 6);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const markerLayer = L.layerGroup().addTo(map);

const els = {
  search: document.querySelector("#searchInput"),
  region: document.querySelector("#regionFilter"),
  skill: document.querySelector("#skillFilter"),
  activity: document.querySelector("#activityFilter"),
  difficulty: document.querySelector("#difficultyFilter"),
  bounds: document.querySelector("#boundsButton"),
  fit: document.querySelector("#fitButton"),
  location: document.querySelector("#locationButton"),
  count: document.querySelector("#resultCount"),
  results: document.querySelector("#resultsList"),
  detail: document.querySelector("#detailPanel"),
  template: document.querySelector("#launchCardTemplate"),
};

const representativePhotos = {
  calmWater: {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Stand_Up_Paddleboard_(30512687396).jpg?width=1200",
    alt: "Stand up paddleboarder on calm open water",
    credit: "Ed Dunens via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Stand_Up_Paddleboard_(30512687396).jpg",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    status: "representative",
  },
  mountainLake: {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Paddling_on_the_lake_(Unsplash).jpg?width=1200",
    alt: "Paddleboarder on a clear mountain lake",
    credit: "Kimon Maritz via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Paddling_on_the_lake_(Unsplash).jpg",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    status: "representative",
  },
  coastalKayak: {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Sea_kayaking.jpg?width=1200",
    alt: "Kayakers paddling on coastal water",
    credit: "Chris Light via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Sea_kayaking.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    status: "representative",
  },
  lakeKayak: {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Man_kayaking_on_a_lake.jpg?width=1200",
    alt: "Kayaker paddling on a quiet lake",
    credit: "HappinessWithout via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Man_kayaking_on_a_lake.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    status: "representative",
  },
  riverKayak: {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/River_Kayaking_(52304129654).jpg?width=1200",
    alt: "Kayaker paddling on a river",
    credit: "Jennifer C. via Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:River_Kayaking_(52304129654).jpg",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    status: "representative",
  },
};

loadLaunches();

async function loadLaunches() {
  try {
    state.allLaunches = Array.isArray(window.LAUNCH_POINTS) ? window.LAUNCH_POINTS : await fetchLaunchJson();
    populateRegions(state.allLaunches);
    bindEvents();
    applyFilters();
    fitToLaunches(state.filteredLaunches);
  } catch (error) {
    console.error(error);
    els.results.innerHTML = '<p class="launch-description">Could not load launch-point data.</p>';
  } finally {
    refreshMapSize();
  }
}

async function fetchLaunchJson() {
  const response = await fetch("data/launch-points.json");
  if (!response.ok) throw new Error(`Launch data request failed: ${response.status}`);
  const launches = await response.json();
  return typeof window.BLUEGREEN_ENRICH_LAUNCH === "function"
    ? launches.map(window.BLUEGREEN_ENRICH_LAUNCH)
    : launches;
}

function bindEvents() {
  [els.search, els.region, els.skill, els.activity, els.difficulty].forEach((control) => {
    control.addEventListener("input", () => {
      state.showOnlyBounds = false;
      applyFilters();
    });
  });

  els.bounds.addEventListener("click", () => {
    state.showOnlyBounds = true;
    applyFilters();
  });

  els.fit.addEventListener("click", () => {
    state.showOnlyBounds = false;
    applyFilters();
    fitToLaunches(state.filteredLaunches);
  });

  els.location.addEventListener("click", useLocation);
  els.detail.addEventListener("click", handleDetailClick);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLaunchDetail();
  });

  map.on("moveend zoomend", () => {
    if (state.showOnlyBounds) applyFilters();
  });

  window.addEventListener("resize", refreshMapSize);
}

function populateRegions(launches) {
  const regions = [...new Set(launches.map((launch) => launch.region))].sort();
  for (const region of regions) {
    const option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    els.region.append(option);
  }
}

function applyFilters() {
  const searchTerm = els.search.value.trim().toLowerCase();
  const maxDifficulty = els.difficulty.value === "all" ? Infinity : Number(els.difficulty.value);
  const bounds = map.getBounds();

  state.filteredLaunches = state.allLaunches.filter((launch) => {
    const matchesSearch =
      !searchTerm ||
      [
        launch.name,
        ...(launch.aliases || []),
        launch.region,
        launch.state,
        launch.waterBody,
        launch.waterType,
        launch.skillLevel,
        launch.bestTime,
        launch.supSuitability,
        launch.windSensitivity,
        launch.useLevel,
        launch.crowdSensitivity,
        launch.stagingSpace,
        launch.description,
        ...(launch.activities || []),
        ...(launch.amenities || []),
        ...(launch.tags || []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm);

    const matchesRegion = els.region.value === "all" || launch.region === els.region.value;
    const matchesSkill = els.skill.value === "all" || launch.skillLevel === els.skill.value;
    const matchesActivity = els.activity.value === "all" || launch.activities.includes(els.activity.value);
    const matchesDifficulty = launch.difficulty <= maxDifficulty;
    const matchesBounds = !state.showOnlyBounds || bounds.contains([launch.lat, launch.lng]);

    return matchesSearch && matchesRegion && matchesSkill && matchesActivity && matchesDifficulty && matchesBounds;
  });

  renderMarkers(state.filteredLaunches);
  renderCards(state.filteredLaunches);
  els.count.textContent = state.filteredLaunches.length;
}

function renderMarkers(launches) {
  markerLayer.clearLayers();
  state.markers.clear();

  for (const launch of launches) {
    const marker = L.marker([launch.lat, launch.lng], {
      icon: L.divIcon({
        className: "",
        html: `<span class="launch-marker">${launch.difficulty}</span>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
        popupAnchor: [0, -18],
      }),
      title: launch.name,
    }).bindPopup(`
      <h3 class="popup-title">${escapeHtml(launch.name)}</h3>
      <p class="popup-detail">${escapeHtml(launch.region)}, ${escapeHtml(launch.state)}</p>
      <p class="popup-detail">SUP ${escapeHtml(launch.supSuitability || "Unknown")} &bull; Difficulty ${escapeHtml(launch.difficulty)}/5</p>
      <p class="popup-detail">Wind sensitivity: ${escapeHtml(launch.windSensitivity || "Unknown")} &bull; Typical use: ${escapeHtml(launch.useLevel || "Unknown")}</p>
      <p class="popup-detail">Best time: ${escapeHtml(launch.bestTime)}</p>
    `);

    marker.on("click", () => openLaunchDetail(launch.id, { focusMap: false }));
    marker.addTo(markerLayer);
    state.markers.set(launch.id, marker);
  }
}

function renderCards(launches) {
  els.results.innerHTML = "";

  if (!launches.length) {
    els.results.innerHTML = '<p class="launch-description">No launch points match those filters.</p>';
    return;
  }

  for (const launch of launches) {
    const card = els.template.content.firstElementChild.cloneNode(true);
    const image = card.querySelector(".launch-image");
    const photoBadge = card.querySelector(".photo-badge");
    const title = card.querySelector("h2");
    const pill = card.querySelector(".pill");
    const meta = card.querySelector(".launch-meta");
    const verification = card.querySelector(".verification-line");
    const ratings = card.querySelector(".rating-row");
    const description = card.querySelector(".launch-description");
    const tags = card.querySelector(".tag-row");
    const button = card.querySelector(".card-button");

    const photo = getPrimaryPhoto(launch);
    if (photo) {
      image.style.backgroundImage = `linear-gradient(135deg, rgba(20,32,35,.18), rgba(15,79,103,.16)), url("${photo.url}")`;
      photoBadge.textContent = photo.status === "location" ? "Launch photo" : "Representative image";
    } else {
      photoBadge.hidden = true;
    }

    title.textContent = launch.name;
    pill.textContent = launch.skillLevel;
    meta.textContent = `${launch.region}, ${launch.state} | ${launch.waterType} | Best: ${launch.bestTime}`;
    verification.textContent = verificationSummary(launch);
    description.textContent = launch.description;
    ratings.innerHTML = `
      <div class="rating"><strong>SUP Suitability</strong>${escapeHtml(launch.supSuitability || "Unknown")}</div>
      <div class="rating"><strong>Difficulty</strong>${launch.difficulty}/5</div>
      <div class="rating"><strong>Wind</strong>${escapeHtml(launch.windSensitivity || "Unknown")}</div>
    `;

    [...launch.activities, ...launch.amenities.slice(0, 4)].forEach((tag) => {
      const el = document.createElement("span");
      el.className = "tag";
      el.textContent = tag;
      tags.append(el);
    });

    button.addEventListener("click", () => openLaunchDetail(launch.id));
    els.results.append(card);
  }
}

function openLaunchDetail(id, options = {}) {
  const launch = state.allLaunches.find((item) => item.id === id);
  if (!launch) return;

  state.selectedLaunchId = id;
  document.body.classList.add("detail-open");
  els.detail.hidden = false;
  els.detail.innerHTML = detailMarkup(launch);

  if (options.focusMap !== false) focusLaunch(id);
}

function closeLaunchDetail() {
  state.selectedLaunchId = null;
  document.body.classList.remove("detail-open");
  els.detail.hidden = true;
  els.detail.innerHTML = "";
}

function handleDetailClick(event) {
  if (event.target.closest("[data-close-detail]")) {
    closeLaunchDetail();
    return;
  }

  const sourceLink = event.target.closest("a");
  if (sourceLink) return;
  if (event.target === els.detail) closeLaunchDetail();
}

function focusLaunch(id) {
  const launch = state.allLaunches.find((item) => item.id === id);
  const marker = state.markers.get(id);
  if (!launch) return;

  refreshMapSize();
  map.setView([launch.lat, launch.lng], Math.max(map.getZoom(), 12), { animate: true });
  if (marker) setTimeout(() => marker.openPopup(), 250);
}

function detailMarkup(launch) {
  const photo = getPrimaryPhoto(launch);
  const photoMarkup = photo
    ? `
      <figure class="detail-photo">
        <img src="${escapeAttribute(photo.url)}" alt="${escapeAttribute(photo.alt || `${launch.name} representative image`)}" loading="lazy" />
        <figcaption>${photoCreditMarkup(photo)}</figcaption>
      </figure>
    `
    : "";
  const sourceUrls = Array.isArray(launch.sourceUrls)
    ? launch.sourceUrls
        .map((source) => (typeof source === "string" ? { label: source, url: source } : source))
        .filter((source) => source && source.url)
    : [];
  const sourceItems = sourceUrls.length
    ? sourceUrls
        .map((source) => `<li><a href="${escapeAttribute(source.url)}" target="_blank" rel="noopener">${escapeHtml(source.label || source.url)}</a></li>`)
        .join("")
    : '<li class="muted-list-item">No official source added yet.</li>';

  return `
    <div class="detail-card" role="dialog" aria-modal="false" aria-labelledby="detailTitle">
      <button class="detail-close" type="button" aria-label="Close launch details" data-close-detail>&times;</button>
      <div class="detail-kicker">${escapeHtml(launch.region)}, ${escapeHtml(launch.state)}</div>
      <h2 id="detailTitle">${escapeHtml(launch.name)}</h2>
      <p class="detail-subtitle">${escapeHtml(launch.waterBody || launch.waterType)} | ${escapeHtml(formatList(launch.activities))} | ${escapeHtml(launch.skillLevel)}</p>

      ${photoMarkup}

      <div class="detail-status ${verificationClass(launch)}">
        <strong>${escapeHtml(launch.verificationStatus || "Needs verification")}</strong>
        <span>${escapeHtml(lastVerifiedText(launch))}</span>
      </div>

      <p>${escapeHtml(launch.description)}</p>

      <dl class="detail-grid">
        <div><dt>SUP Suitability</dt><dd>${escapeHtml(launch.supSuitability || "Unknown")}</dd></div>
        <div><dt>Difficulty</dt><dd>${escapeHtml(launch.difficulty)}/5</dd></div>
        <div><dt>Wind Sensitivity</dt><dd>${escapeHtml(launch.windSensitivity || "Unknown")}</dd></div>
        <div><dt>Typical Use</dt><dd>${escapeHtml(launch.useLevel || "Unknown")}</dd></div>
        <div><dt>Crowd Sensitivity</dt><dd>${escapeHtml(launch.crowdSensitivity || "Unknown")}</dd></div>
        <div><dt>Staging Space</dt><dd>${escapeHtml(launch.stagingSpace || "Unknown")}</dd></div>
        <div><dt>Best Time</dt><dd>${escapeHtml(launch.bestTime || "Unknown")}</dd></div>
        <div><dt>Assessment Confidence</dt><dd>${escapeHtml(launch.assessmentConfidence || "Unknown")}</dd></div>
      </dl>

      <p class="source-note"><strong>BlueGreen Guide assessment:</strong> Suitability and sensitivity fields are curated planning guidance, not live condition measurements or safety guarantees. Conditions and use levels vary.</p>

      <section class="detail-section">
        <h3>Amenities</h3>
        <p>${escapeHtml(formatList(launch.amenities))}</p>
      </section>

      <section class="detail-section">
        <h3>Planning Notes</h3>
        <p>${escapeHtml(formatList(launch.tags))}</p>
      </section>

      <section class="detail-section">
        <h3>Sources</h3>
        <ul class="source-list">${sourceItems}</ul>
        <p class="source-note">${escapeHtml(launch.sourceNotes || "Check official sources before relying on access, fees, parking, rentals, rules, tides, wind, or hazard details.")}</p>
      </section>
    </div>
  `;
}

function getPrimaryPhoto(launch) {
  const photos = Array.isArray(launch.photoUrls) ? launch.photoUrls : [];
  const photo = photos.find((item) => item && item.url) || (launch.image ? { url: launch.image } : getRepresentativePhoto(launch));
  if (!photo) return null;

  return {
    ...photo,
    status: launch.photoStatus || photo.status || "representative",
  };
}

function getRepresentativePhoto(launch) {
  const searchText = [
    launch.name,
    launch.region,
    launch.waterType,
    ...(launch.activities || []),
    ...(launch.tags || []),
  ].join(" ").toLowerCase();

  if (searchText.includes("river") || searchText.includes("canyon")) return representativePhotos.riverKayak;
  if (searchText.includes("ocean") || searchText.includes("coastal") || searchText.includes("surf") || searchText.includes("beach")) return representativePhotos.coastalKayak;
  if (searchText.includes("mountain") || searchText.includes("alpine") || searchText.includes("tahoe") || searchText.includes("sierra")) return representativePhotos.mountainLake;
  if ((launch.activities || []).length === 1 && launch.activities[0] === "Kayak") return representativePhotos.lakeKayak;
  if (searchText.includes("reservoir") || searchText.includes("lake") || searchText.includes("desert")) return representativePhotos.mountainLake;
  return representativePhotos.calmWater;
}

function photoCreditMarkup(photo) {
  const statusLabel = photo.status === "location" ? "Launch photo" : "Representative image";
  const credit = photo.credit || "Image source";
  const license = photo.licenseUrl
    ? ` | <a href="${escapeAttribute(photo.licenseUrl)}" target="_blank" rel="noopener">${escapeHtml(photo.license)}</a>`
    : photo.license
      ? ` | ${escapeHtml(photo.license)}`
      : "";
  const source = photo.creditUrl
    ? `<a href="${escapeAttribute(photo.creditUrl)}" target="_blank" rel="noopener">${escapeHtml(credit)}</a>`
    : escapeHtml(credit);

  return `${escapeHtml(statusLabel)}: ${source}${license}`;
}

function verificationSummary(launch) {
  const status = launch.verificationStatus || "Needs verification";
  const date = launch.lastVerified ? `Last checked ${launch.lastVerified}` : "Official source pending";
  return `${status} | ${date}`;
}

function verificationClass(launch) {
  const status = (launch.verificationStatus || "").trim().toLowerCase();
  return status === "verified" ? "is-verified" : "needs-verification";
}

function lastVerifiedText(launch) {
  return launch.lastVerified ? `Last checked ${launch.lastVerified}` : "Access, fees, rules, and conditions need official-source review.";
}

function formatList(value) {
  return Array.isArray(value) && value.length ? value.join(", ") : "Unknown";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

function fitToLaunches(launches) {
  if (!launches.length) return;
  const bounds = L.latLngBounds(launches.map((launch) => [launch.lat, launch.lng]));
  refreshMapSize();
  map.fitBounds(bounds, { padding: [45, 45], maxZoom: 11 });
}

function useLocation() {
  if (!navigator.geolocation) {
    alert("Location is not available in this browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      refreshMapSize();
      map.setView([latitude, longitude], 10);
      L.circleMarker([latitude, longitude], {
        radius: 8,
        color: "#0f4f67",
        weight: 3,
        fillColor: "#4fa6c8",
        fillOpacity: 0.65,
      })
        .addTo(markerLayer)
        .bindPopup("Your approximate location")
        .openPopup();
    },
    () => alert("Could not access your location.")
  );
}

function refreshMapSize() {
  requestAnimationFrame(() => {
    map.invalidateSize({ animate: false });
  });
}
