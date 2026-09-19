(() => {
  const MOBILE_QUERY = window.matchMedia("(max-width: 720px)");
  const body = document.body;
  const appShell = document.querySelector(".app-shell");
  const nav = document.querySelector("#mobileBottomNav");
  const nearbyStatus = document.querySelector("#mobileNearbyStatus");
  const nearbyResults = document.querySelector("#mobileNearbyResults");
  const detailPanel = document.querySelector("#detailPanel");
  const navButtons = [...document.querySelectorAll("[data-mobile-view-target]")];
  let nearbyLoaded = false;
  let nearbyLoading = false;

  if (!nav || !detailPanel || !appShell) return;

  function iconPath(name) {
    const icons = {
      saved: '<path d="M7 4h10a1 1 0 0 1 1 1v15l-6-3-6 3V5a1 1 0 0 1 1-1Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />',
      trip: '<path d="M4 17 9 7l3 6 2-4 6 8H4Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />',
      guide: '<path d="M4 4.5c2.8-.9 5.5-.5 8 1.2v14c-2.5-1.7-5.2-2.1-8-1.2v-14Zm16 0c-2.8-.9-5.5-.5-8 1.2v14c2.5-1.7 5.2-2.1 8-1.2v-14Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />',
      quick: '<path d="M5 6h14M5 12h10M5 18h7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />',
      info: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8" /><path d="M12 11v6m0-10h.01" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />',
      compass: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8" /><path d="m15 9-2 4-4 2 2-4 4-2Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />',
      settings: '<path d="M4 7h10m3 0h3M4 17h3m3 0h10M14 4v6M7 14v6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />',
    };
    return icons[name] || icons.info;
  }

  function icon(name) {
    return `<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true">${iconPath(name)}</svg>`;
  }

  const savedPanel = document.createElement("section");
  savedPanel.id = "mobileSavedPanel";
  savedPanel.className = "mobile-saved-panel";
  savedPanel.setAttribute("aria-labelledby", "mobileSavedTitle");
  savedPanel.innerHTML = `
    <div class="mobile-saved-heading">
      <p class="eyebrow">Plan ahead</p>
      <h2 id="mobileSavedTitle">Saved places & trips</h2>
      <p>This is a visual placeholder for the future planning experience. Nothing is stored in this field-test build.</p>
    </div>
    <div class="mobile-segmented-tabs" role="tablist" aria-label="Saved planning views">
      <button type="button" role="tab" aria-selected="true" data-saved-tab="places">Saved Places</button>
      <button type="button" role="tab" aria-selected="false" data-saved-tab="trips">My Trips</button>
    </div>
    <section class="mobile-saved-placeholder" data-saved-panel="places">
      ${icon("saved")}
      <h3>Saved Places</h3>
      <p>Save is visible in the interface for testing, but persistent saved places are not enabled yet.</p>
      <button type="button" data-mobile-view-jump="explore">Explore places</button>
    </section>
    <section class="mobile-saved-placeholder" data-saved-panel="trips" hidden>
      ${icon("trip")}
      <h3>My Trips</h3>
      <p>Trip planning remains a future feature. No account or trip data is created in this build.</p>
      <button type="button" data-mobile-view-jump="explore">Explore places</button>
    </section>
  `;
  appShell.append(savedPanel);

  const morePanel = document.createElement("section");
  morePanel.id = "mobileMorePanel";
  morePanel.className = "mobile-more-panel";
  morePanel.setAttribute("aria-labelledby", "mobileMoreTitle");
  morePanel.innerHTML = `
    <div class="mobile-more-heading">
      <p class="eyebrow">BlueGreen Guide</p>
      <h2 id="mobileMoreTitle">More</h2>
      <p>Guides, planning help, and app information.</p>
    </div>
    <div class="mobile-more-grid" aria-label="BlueGreen Guide resources">
      <a href="docs/user-guide/" class="mobile-more-card">${icon("guide")}<span><strong>User Guide</strong><small>Learn the app</small></span></a>
      <a href="docs/quick-start/" class="mobile-more-card">${icon("quick")}<span><strong>Quick Start</strong><small>Start here</small></span></a>
      <a href="docs/blue-and-green-spaces/" class="mobile-more-card">${icon("compass")}<span><strong>Blue + Green Spaces</strong><small>What the concept means</small></span></a>
      <a href="docs/launch-suitability/" class="mobile-more-card">${icon("info")}<span><strong>Planning Guidance</strong><small>Launch suitability</small></span></a>
      <a href="docs/" class="mobile-more-card">${icon("guide")}<span><strong>Documentation</strong><small>Browse all guides</small></span></a>
      <button type="button" class="mobile-more-card" data-settings-placeholder>${icon("settings")}<span><strong>Settings</strong><small>Placeholder</small></span></button>
    </div>
    <div class="mobile-more-note">
      <strong>Field-test build</strong>
      <span>Phase 1 is complete. Mobile/PWA refinement and place verification are continuing before Phase 2 resumes.</span>
    </div>
  `;
  appShell.append(morePanel);

  const toast = document.createElement("div");
  toast.className = "mobile-toast";
  toast.hidden = true;
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  body.append(toast);
  let toastTimer = null;

  window.BLUEGREEN_SHOW_TOAST = (message) => {
    if (!message) return;
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.hidden = true;
    }, 3200);
  };

  function isMobile() {
    return MOBILE_QUERY.matches;
  }

  function closeCurrentDetail() {
    if (detailPanel.hidden) return;
    const closeButton = detailPanel.querySelector("[data-close-detail]");
    if (closeButton) closeButton.click();
  }

  function setView(view, options = {}) {
    const allowed = new Set(["explore", "map", "nearby", "saved", "more"]);
    const nextView = allowed.has(view) ? view : "map";

    if (options.keepDetail !== true) closeCurrentDetail();
    body.dataset.mobileView = nextView;

    navButtons.forEach((button) => {
      const active = button.dataset.mobileViewTarget === nextView;
      if (active) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });

    if (nextView === "nearby" && options.loadNearby !== false) loadNearby();

    if (nextView === "map") {
      requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
    }

    if (options.updateUrl !== false && isMobile()) {
      const url = new URL(window.location.href);
      if (nextView === "map") url.searchParams.delete("view");
      else url.searchParams.set("view", nextView);
      window.history.replaceState({}, "", url);
    }
  }

  window.BLUEGREEN_SET_MOBILE_VIEW = setView;

  navButtons.forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.mobileViewTarget));
  });

  document.querySelectorAll("[data-mobile-view-jump]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.mobileViewJump));
  });

  savedPanel.querySelectorAll("[data-saved-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.savedTab;
      savedPanel.querySelectorAll("[data-saved-tab]").forEach((item) => {
        item.setAttribute("aria-selected", item === button ? "true" : "false");
      });
      savedPanel.querySelectorAll("[data-saved-panel]").forEach((panel) => {
        panel.hidden = panel.dataset.savedPanel !== target;
      });
    });
  });

  morePanel.querySelector("[data-settings-placeholder]")?.addEventListener("click", () => {
    window.BLUEGREEN_SHOW_TOAST("Settings are not enabled in this field-test build yet.");
  });

  function prepareMobileDetail() {
    if (!isMobile() || detailPanel.hidden) return;

    const detailCard = detailPanel.querySelector(".detail-card");
    if (!detailCard) return;

    const shouldPreviewOnMap =
      body.dataset.mobileView === "map" && !detailPanel.classList.contains("mobile-detail-expanded");

    detailPanel.classList.toggle("mobile-sheet-collapsed", shouldPreviewOnMap);

    let expandButton = detailCard.querySelector(".mobile-sheet-expand");
    if (!expandButton) {
      expandButton = document.createElement("button");
      expandButton.type = "button";
      expandButton.className = "mobile-sheet-expand";
      expandButton.textContent = "View place details";
      expandButton.setAttribute("aria-expanded", "false");
      expandButton.addEventListener("click", () => {
        detailPanel.classList.remove("mobile-sheet-collapsed");
        detailPanel.classList.add("mobile-detail-expanded");
        expandButton.setAttribute("aria-expanded", "true");
        detailCard.scrollTop = 0;
      });
      detailCard.append(expandButton);
    }
  }

  const detailObserver = new MutationObserver(() => {
    if (detailPanel.hidden) {
      detailPanel.classList.remove("mobile-sheet-collapsed", "mobile-detail-expanded");
      return;
    }
    prepareMobileDetail();
  });

  detailObserver.observe(detailPanel, {
    attributes: true,
    attributeFilter: ["hidden"],
    childList: true,
  });

  function loadNearby() {
    if (!isMobile() || nearbyLoading || nearbyLoaded) return;

    if (!navigator.geolocation) {
      setNearbyMessage("Location is not available in this browser. Use Explore or Map to browse places.");
      return;
    }

    nearbyLoading = true;
    setNearbyMessage("Finding nearby BlueGreen Guide places…");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        nearbyLoading = false;
        nearbyLoaded = true;
        renderNearby(position.coords.latitude, position.coords.longitude);
      },
      () => {
        nearbyLoading = false;
        setNearbyMessage("Location access was not available. You can still browse all places from Explore or Map.");
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  }

  function setNearbyMessage(message) {
    if (nearbyStatus) nearbyStatus.textContent = message;
    if (nearbyResults) nearbyResults.innerHTML = "";
  }

  function placePhoto(launch) {
    const primary =
      typeof window.BLUEGREEN_GET_PRIMARY_PHOTO === "function"
        ? window.BLUEGREEN_GET_PRIMARY_PHOTO(launch)
        : null;
    if (primary?.url) return primary.url;

    const photos = Array.isArray(launch?.photoUrls) ? launch.photoUrls : [];
    return photos.find((item) => item && item.url)?.url || launch?.image || "";
  }

  function placeTypeLabel(launch) {
    if (Array.isArray(launch?.placeTypes) && launch.placeTypes.length) {
      return String(launch.placeTypes[0]).replace(/-/g, " ");
    }
    if (launch?.spaceType === "green") return "Land place";
    if (launch?.spaceType === "mixed") return "Water + land place";
    return launch?.waterType || "Water place";
  }

  function nearbyThumbMarkup(launch) {
    const photo = placePhoto(launch);
    if (photo) {
      return `<span class="mobile-nearby-thumb"><img src="${escapeAttribute(photo)}" alt="" loading="lazy" /></span>`;
    }

    const className =
      launch?.spaceType === "green"
        ? "is-land"
        : launch?.spaceType === "mixed"
          ? "is-mixed"
          : "is-water";

    return `<span class="mobile-nearby-thumb mobile-nearby-thumb-fallback ${className}" aria-hidden="true">BGG</span>`;
  }

  function openNearbyDetail(launch) {
    const opener =
      typeof window.openLaunchDetail === "function"
        ? window.openLaunchDetail
        : typeof openLaunchDetail === "function"
          ? openLaunchDetail
          : null;

    if (opener) {
      opener(launch.id, { focusMap: false });
      requestAnimationFrame(prepareMobileDetail);
    }
  }

  function renderNearby(latitude, longitude) {
    const launches = Array.isArray(window.LAUNCH_POINTS) ? window.LAUNCH_POINTS : [];
    if (!launches.length) {
      setNearbyMessage("Place data is not available yet. Try Explore or Map.");
      return;
    }

    const ranked = launches
      .filter((launch) => Number.isFinite(launch.lat) && Number.isFinite(launch.lng))
      .map((launch) => ({
        launch,
        miles: distanceMiles(latitude, longitude, launch.lat, launch.lng),
      }))
      .sort((a, b) => a.miles - b.miles)
      .slice(0, 8);

    if (nearbyStatus) {
      nearbyStatus.textContent =
        "Distances are straight-line estimates from your approximate device location. Check official sources for access and route details.";
    }

    nearbyResults.innerHTML = "";

    ranked.forEach(({ launch, miles }) => {
      const card = document.createElement("article");
      card.className = "mobile-nearby-card";
      card.innerHTML = `
        <button type="button" class="mobile-nearby-main" aria-label="Open ${escapeAttribute(launch.name)} details">
          ${nearbyThumbMarkup(launch)}
          <span class="mobile-nearby-copy">
            <strong>${escapeHtml(launch.name)}</strong>
            <span>${escapeHtml(launch.region)}, ${escapeHtml(launch.state)} · ${escapeHtml(placeTypeLabel(launch))}</span>
          </span>
        </button>
        <span class="mobile-nearby-distance">${formatDistance(miles)}</span>
        <button type="button" class="mobile-nearby-action" data-nearby-save aria-label="Save ${escapeAttribute(launch.name)}">${icon("saved")}</button>
        <button type="button" class="mobile-nearby-action" data-nearby-more aria-label="More options for ${escapeAttribute(launch.name)}"><span aria-hidden="true">•••</span></button>
      `;

      card.querySelector(".mobile-nearby-main")?.addEventListener("click", () => openNearbyDetail(launch));

      card.querySelector("[data-nearby-save]")?.addEventListener("click", () => {
        window.BLUEGREEN_SHOW_TOAST("Saved Places is a placeholder in this field-test build. Nothing is stored yet.");
      });

      card.querySelector("[data-nearby-more]")?.addEventListener("click", () => {
        window.BLUEGREEN_SHOW_TOAST("Additional place actions are not enabled in this field-test build yet.");
      });

      nearbyResults.append(card);
    });
  }

  function distanceMiles(lat1, lon1, lat2, lon2) {
    const earthRadiusMiles = 3958.8;
    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
    return earthRadiusMiles * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function formatDistance(miles) {
    if (miles < 0.1) return "<0.1 mi";
    if (miles < 10) return `${miles.toFixed(1)} mi`;
    return `${Math.round(miles)} mi`;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value);
  }

  function syncResponsiveState() {
    if (isMobile()) {
      const requested = new URLSearchParams(window.location.search).get("view");
      const allowed = new Set(["explore", "map", "nearby", "saved", "more"]);
      const initial = allowed.has(requested) ? requested : body.dataset.mobileView || "map";
      setView(initial, { loadNearby: false, updateUrl: false });
      prepareMobileDetail();
    } else {
      detailPanel.classList.remove("mobile-sheet-collapsed", "mobile-detail-expanded");
    }
  }

  MOBILE_QUERY.addEventListener?.("change", syncResponsiveState);
  syncResponsiveState();
})();
