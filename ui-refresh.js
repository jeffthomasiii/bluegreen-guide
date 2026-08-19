(() => {
  const sprite = "assets/icons/wayfinding.svg";

  const icon = (name, label = "") =>
    `<svg class="ui-icon" aria-hidden="true" focusable="false"><use href="${sprite}#icon-${name}"></use></svg>${label ? `<span>${escapeHtml(label)}</span>` : ""}`;

  const waterTerms = ["sup", "kayak", "canoe", "paddle", "marina", "boat", "beach", "lake", "river", "ocean", "harbor", "lagoon", "bay"];
  const landTerms = ["trail", "hiking", "park", "camp", "garden", "forest", "woods", "biking", "climbing", "wildlife"];

  function classifyTag(text) {
    const value = text.toLowerCase();
    if (waterTerms.some((term) => value.includes(term))) return "water";
    if (landTerms.some((term) => value.includes(term))) return "land";
    return "neutral";
  }

  function iconFor(text) {
    const value = text.toLowerCase();
    if (value.includes("kayak")) return "kayak";
    if (value.includes("sup") || value.includes("paddle")) return "paddle";
    if (value.includes("marina") || value.includes("harbor")) return "marina";
    if (value.includes("lake")) return "lake";
    if (value.includes("river")) return "river";
    if (value.includes("beach") || value.includes("ocean")) return "beach";
    if (value.includes("trail") || value.includes("hiking")) return "trail";
    if (value.includes("park")) return "park";
    if (value.includes("camp")) return "camp";
    if (value.includes("garden")) return "garden";
    if (value.includes("scenic")) return "scenic";
    if (value.includes("parking")) return "parking";
    if (value.includes("restroom")) return "restroom";
    if (value.includes("accessible")) return "accessible";
    if (value.includes("dog")) return "dog";
    if (value.includes("family")) return "family";
    if (value.includes("beginner")) return "beginner";
    if (value.includes("rental")) return "rentals";
    return classifyTag(text) === "water" ? "water" : classifyTag(text) === "land" ? "park" : "check";
  }

  function decorateTags(root = document) {
    root.querySelectorAll(".tag:not([data-ui-ready])").forEach((tag) => {
      const text = tag.textContent.trim();
      const category = classifyTag(text);
      tag.classList.add(`tag-${category}`);
      tag.innerHTML = `${icon(iconFor(text))}<span>${escapeHtml(text)}</span>`;
      tag.dataset.uiReady = "true";
    });
  }

  function decorateVerification(root = document) {
    root.querySelectorAll(".verification-line:not([data-ui-ready])").forEach((line) => {
      const text = line.textContent.trim();
      const isVerified = text.toLowerCase().includes("verified") && !text.toLowerCase().includes("needs");
      line.innerHTML = `${icon(isVerified ? "check" : "alert")}<span>${escapeHtml(text)}</span>`;
      line.dataset.uiReady = "true";
    });
  }

  function decorateButtons() {
    const buttonMap = [
      ["#locationButton", "location"],
      ["#fitButton", "map"],
      ["#boundsButton", "filter"],
    ];
    buttonMap.forEach(([selector, name]) => {
      const button = document.querySelector(selector);
      if (!button || button.dataset.uiReady) return;
      const label = button.textContent.trim();
      button.innerHTML = `${icon(name)}<span>${escapeHtml(label)}</span>`;
      button.dataset.uiReady = "true";
    });
  }

  function decorateDetail(root = document) {
    const headings = {
      Amenities: "check",
      "Planning Notes": "alert",
      Sources: "source",
    };
    root.querySelectorAll(".detail-section h3:not([data-ui-ready])").forEach((heading) => {
      const label = heading.textContent.trim();
      heading.innerHTML = `${icon(headings[label] || "check")}<span>${escapeHtml(label)}</span>`;
      heading.dataset.uiReady = "true";
    });
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
    applyFilters = function refreshedApplyFilters() {
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
        const matchesDifficulty = Number(launch.difficulty) <= maxDifficulty;
        const matchesBounds = !state.showOnlyBounds || bounds.contains([launch.lat, launch.lng]);
        const matchesCollection = !activeCollection || activeCollection.has(launch.id);
        const matchesSpaceType = mobileSpaceType === "all" || launch.spaceType === mobileSpaceType;

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

  function markerClassFor(launch) {
    return launch.spaceType === "green" ? "marker-land" : launch.spaceType === "neutral" ? "marker-neutral" : "marker-water";
  }

  if (typeof renderMarkers === "function") {
    renderMarkers = function refreshedRenderMarkers(launches) {
      markerLayer.clearLayers();
      state.markers.clear();

      for (const launch of launches) {
        const marker = L.marker([launch.lat, launch.lng], {
          icon: L.divIcon({
            className: "",
            html: `<span class="launch-marker ${markerClassFor(launch)}">${escapeHtml(launch.difficulty)}</span>`,
            iconSize: [38, 38],
            iconAnchor: [19, 19],
            popupAnchor: [0, -20],
          }),
          title: launch.name,
        }).bindPopup(`
          <h3 class="popup-title">${escapeHtml(launch.name)}</h3>
          <p class="popup-detail">${escapeHtml(launch.region)}, ${escapeHtml(launch.state)}</p>
          <p class="popup-detail">Difficulty ${escapeHtml(launch.difficulty)}/5 &bull; Popularity ${escapeHtml(launch.popularity)}/5</p>
          <p class="popup-detail">Best time: ${escapeHtml(launch.bestTime)}</p>
        `);

        marker.on("click", () => openLaunchDetail(launch.id, { focusMap: false }));
        marker.addTo(markerLayer);
        state.markers.set(launch.id, marker);
      }
    };
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        decorateTags(node);
        decorateVerification(node);
        decorateDetail(node);
      });
    });
  });

  decorateButtons();
  decorateTags();
  decorateVerification();
  decorateDetail();
  observer.observe(document.body, { childList: true, subtree: true });

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
