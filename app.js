const state = {
  allLaunches: [],
  filteredLaunches: [],
  markers: new Map(),
  showOnlyBounds: false,
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
  template: document.querySelector("#launchCardTemplate"),
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
  if (!response.ok) {
    throw new Error(`Launch data request failed: ${response.status}`);
  }
  return response.json();
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

  map.on("moveend zoomend", () => {
    if (state.showOnlyBounds) {
      applyFilters();
    }
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
        launch.region,
        launch.state,
        launch.waterType,
        launch.skillLevel,
        launch.bestTime,
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
      <h3 class="popup-title">${launch.name}</h3>
      <p class="popup-detail">${launch.region}, ${launch.state}</p>
      <p class="popup-detail">Difficulty ${launch.difficulty}/5 &bull; Popularity ${launch.popularity}/5</p>
      <p class="popup-detail">Best time: ${launch.bestTime}</p>
    `);

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
    const title = card.querySelector("h2");
    const pill = card.querySelector(".pill");
    const meta = card.querySelector(".launch-meta");
    const ratings = card.querySelector(".rating-row");
    const description = card.querySelector(".launch-description");
    const tags = card.querySelector(".tag-row");
    const button = card.querySelector(".card-button");

    if (launch.image) {
      image.style.backgroundImage = `linear-gradient(135deg, rgba(20,32,35,.25), rgba(91,121,83,.15)), url("${launch.image}")`;
    }

    title.textContent = launch.name;
    pill.textContent = launch.skillLevel;
    meta.textContent = `${launch.region}, ${launch.state} | ${launch.waterType} | Best: ${launch.bestTime}`;
    description.textContent = launch.description;
    ratings.innerHTML = `
      <div class="rating"><strong>Popularity</strong>${starRating(launch.popularity)} ${launch.popularity}/5</div>
      <div class="rating"><strong>Difficulty</strong>${launch.difficulty}/5</div>
    `;

    [...launch.activities, ...launch.amenities.slice(0, 4)].forEach((tag) => {
      const el = document.createElement("span");
      el.className = "tag";
      el.textContent = tag;
      tags.append(el);
    });

    button.addEventListener("click", () => focusLaunch(launch.id));
    els.results.append(card);
  }
}

function focusLaunch(id) {
  const launch = state.allLaunches.find((item) => item.id === id);
  const marker = state.markers.get(id);

  if (!launch) return;

  refreshMapSize();
  map.setView([launch.lat, launch.lng], Math.max(map.getZoom(), 12), { animate: true });
  if (marker) {
    setTimeout(() => marker.openPopup(), 250);
  }
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

function starRating(value) {
  const rounded = Math.round(value);
  return "★★★★★".slice(0, rounded) + "☆☆☆☆☆".slice(0, 5 - rounded);
}

function refreshMapSize() {
  requestAnimationFrame(() => {
    map.invalidateSize({ animate: false });
  });
}
