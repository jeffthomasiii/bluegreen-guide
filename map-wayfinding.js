(() => {
  const sprite = "assets/icons/wayfinding.svg";
  const mapPanel = document.querySelector(".map-panel");

  function iconMarkup(name, className = "marker-icon") {
    return `<svg class="${className}" aria-hidden="true" focusable="false"><use href="${sprite}#icon-${name}"></use></svg>`;
  }

  function placeSpaceType(launch) {
    if (launch?.spaceType === "green") return "green";
    if (launch?.spaceType === "mixed") return "mixed";
    return "blue";
  }

  function placeTypeLabel(launch) {
    const type = placeSpaceType(launch);
    if (type === "green") return "Land place";
    if (type === "mixed") return "Water + land place";
    return "Water place";
  }

  function markerMarkup(launch) {
    const type = placeSpaceType(launch);
    if (type === "green") {
      return `<span class="launch-marker marker-land" aria-hidden="true">${iconMarkup("park")}</span>`;
    }
    if (type === "mixed") {
      return `<span class="launch-marker marker-mixed" aria-hidden="true"><span class="marker-mixed-water">${iconMarkup("water")}</span></span>`;
    }
    return `<span class="launch-marker marker-water" aria-hidden="true">${iconMarkup("water")}</span>`;
  }

  function searchableText(launch) {
    return [
      launch.name,
      ...(launch.aliases || []),
      launch.region,
      launch.state,
      launch.waterBody,
      launch.waterType,
      launch.skillLevel,
      launch.bestTime,
      launch.description,
      ...(launch.activities || []),
      ...(launch.amenities || []),
      ...(launch.tags || []),
      ...(launch.placeTypes || []),
      ...(launch.activityTypes || []),
      ...(launch.amenityTypes || []),
      ...(launch.attributeTypes || []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  }

  if (typeof applyFilters === "function") {
    applyFilters = function wayfindingApplyFilters() {
      const searchTerm = els.search.value.trim().toLowerCase();
      const maxDifficulty = els.difficulty.value === "all" ? Infinity : Number(els.difficulty.value);
      const bounds = map.getBounds();
      const activeCollection = Array.isArray(window.BLUEGREEN_ACTIVE_COLLECTION_IDS)
        ? new Set(window.BLUEGREEN_ACTIVE_COLLECTION_IDS)
        : null;
      const mobileSpaceType = window.BLUEGREEN_MOBILE_SPACE_TYPE || "all";

      state.filteredLaunches = state.allLaunches.filter((launch) => {
        const matchesSearch = !searchTerm || searchableText(launch).includes(searchTerm);
        const matchesRegion = els.region.value === "all" || launch.region === els.region.value;
        const matchesSkill = els.skill.value === "all" || launch.skillLevel === els.skill.value;
        const matchesActivity =
          els.activity.value === "all" || (launch.activities || []).includes(els.activity.value);
        const difficulty = Number(launch.difficulty);
        const matchesDifficulty =
          maxDifficulty === Infinity || !Number.isFinite(difficulty) || difficulty <= maxDifficulty;
        const matchesBounds = !state.showOnlyBounds || bounds.contains([launch.lat, launch.lng]);
        const matchesCollection = !activeCollection || activeCollection.has(launch.id);
        const spaceType = placeSpaceType(launch);
        const matchesSpaceType =
          mobileSpaceType === "all" ||
          spaceType === mobileSpaceType ||
          (spaceType === "mixed" && (mobileSpaceType === "blue" || mobileSpaceType === "green"));

        return (
          matchesSearch &&
          matchesRegion &&
          matchesSkill &&
          matchesActivity &&
          matchesDifficulty &&
          matchesBounds &&
          matchesCollection &&
          matchesSpaceType
        );
      });

      renderMarkers(state.filteredLaunches);
      renderCards(state.filteredLaunches);
      els.count.textContent = state.filteredLaunches.length;
    };
  }

  if (typeof renderMarkers === "function") {
    renderMarkers = function wayfindingRenderMarkers(launches) {
      markerLayer.clearLayers();
      state.markers.clear();

      for (const launch of launches) {
        const difficulty = Number.isFinite(Number(launch.difficulty)) ? `${escapeHtml(launch.difficulty)}/5` : "Unknown";
        const marker = L.marker([launch.lat, launch.lng], {
          icon: L.divIcon({
            className: "",
            html: markerMarkup(launch),
            iconSize: [42, 42],
            iconAnchor: [21, 21],
            popupAnchor: [0, -22],
          }),
          title: `${launch.name} — ${placeTypeLabel(launch)}`,
        }).bindPopup(`
          <h3 class="popup-title">${escapeHtml(launch.name)}</h3>
          <p class="popup-detail"><strong>${escapeHtml(placeTypeLabel(launch))}</strong> &bull; ${escapeHtml(launch.region)}, ${escapeHtml(launch.state)}</p>
          <p class="popup-detail">Difficulty ${difficulty} &bull; Popularity ${escapeHtml(launch.popularity ?? "Unknown")}/5</p>
          <p class="popup-detail">Best time: ${escapeHtml(launch.bestTime || "Conditions vary")}</p>
        `);

        marker.on("click", () => openLaunchDetail(launch.id, { focusMap: false }));
        marker.addTo(markerLayer);
        state.markers.set(launch.id, marker);
      }
    };
  }

  function addMapLegend() {
    if (!mapPanel || mapPanel.querySelector(".map-wayfinding-legend")) return;

    const legend = document.createElement("details");
    legend.className = "map-wayfinding-legend";
    legend.innerHTML = `
      <summary>Map key</summary>
      <div class="map-wayfinding-legend-body" aria-label="Map marker legend">
        <div class="map-legend-item">
          <span class="legend-marker marker-water">${iconMarkup("water", "marker-icon")}</span>
          <span><strong>Water</strong><small>Blue circle</small></span>
        </div>
        <div class="map-legend-item">
          <span class="legend-marker marker-land">${iconMarkup("park", "marker-icon")}</span>
          <span><strong>Land</strong><small>Green square</small></span>
        </div>
        <div class="map-legend-item">
          <span class="legend-marker marker-mixed"><span class="marker-mixed-water">${iconMarkup("water", "marker-icon")}</span></span>
          <span><strong>Water + land</strong><small>Combined shapes</small></span>
        </div>
      </div>
    `;
    mapPanel.append(legend);
  }

  addMapLegend();
  if (typeof applyFilters === "function") applyFilters();

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
