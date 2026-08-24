(() => {
  const sprite = "assets/icons/wayfinding.svg";
  const mapPanel = document.querySelector(".map-panel");
  let selectedMarkerId = null;

  function iconMarkup(name, className = "marker-icon") {
    return `<svg class="${className}" aria-hidden="true" focusable="false"><use href="${sprite}#icon-${name}"></use></svg>`;
  }

  function mixedLandscapeIcon(className = "marker-icon marker-icon-mixed") {
    return `<svg class="${className}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M3.5 13.5 8.5 8l3.2 3.5 3.6-5 5.2 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M3.5 17c1.7-1.1 3.4-1.1 5.1 0s3.4 1.1 5.1 0 3.4-1.1 5.1 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
      <path d="M5 20c1.5-.9 3-.9 4.5 0s3 .9 4.5 0 3-.9 4.5 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
    </svg>`;
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
      return `<span class="map-pin map-pin-land" aria-hidden="true"><span class="map-pin-face">${iconMarkup("park")}</span></span>`;
    }
    if (type === "mixed") {
      return `<span class="map-pin map-pin-mixed" aria-hidden="true"><span class="map-pin-face">${mixedLandscapeIcon()}</span></span>`;
    }
    return `<span class="map-pin map-pin-water" aria-hidden="true"><span class="map-pin-face">${iconMarkup("water")}</span></span>`;
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

  function updateSelectedMarker() {
    state.markers.forEach((marker, id) => {
      const element = marker.getElement?.();
      const pin = element?.querySelector?.(".map-pin");
      if (!pin) return;
      pin.classList.toggle("is-selected", id === selectedMarkerId);
    });
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
            iconSize: [30, 40],
            iconAnchor: [15, 40],
            popupAnchor: [0, -36],
          }),
          title: `${launch.name} — ${placeTypeLabel(launch)}`,
        }).bindPopup(`
          <h3 class="popup-title">${escapeHtml(launch.name)}</h3>
          <p class="popup-detail"><strong>${escapeHtml(placeTypeLabel(launch))}</strong> &bull; ${escapeHtml(launch.region)}, ${escapeHtml(launch.state)}</p>
          <p class="popup-detail">Difficulty ${difficulty} &bull; Popularity ${escapeHtml(launch.popularity ?? "Unknown")}/5</p>
          <p class="popup-detail">Best time: ${escapeHtml(launch.bestTime || "Conditions vary")}</p>
        `);

        marker.on("click", () => {
          selectedMarkerId = launch.id;
          updateSelectedMarker();
          openLaunchDetail(launch.id, { focusMap: false });
        });
        marker.on("add", updateSelectedMarker);
        marker.addTo(markerLayer);
        state.markers.set(launch.id, marker);
      }

      updateSelectedMarker();
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
          <span class="legend-pin map-pin-water"><span class="map-pin-face">${iconMarkup("water", "marker-icon")}</span></span>
          <span><strong>Water</strong><small>Blue space · waves</small></span>
        </div>
        <div class="map-legend-item">
          <span class="legend-pin map-pin-land"><span class="map-pin-face">${iconMarkup("park", "marker-icon")}</span></span>
          <span><strong>Land</strong><small>Green space · tree</small></span>
        </div>
        <div class="map-legend-item">
          <span class="legend-pin map-pin-mixed"><span class="map-pin-face">${mixedLandscapeIcon("marker-icon marker-icon-mixed")}</span></span>
          <span><strong>Water + land</strong><small>Blue/green · landscape</small></span>
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
