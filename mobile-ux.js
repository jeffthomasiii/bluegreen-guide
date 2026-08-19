(() => {
  const MOBILE_QUERY = window.matchMedia("(max-width: 720px)");
  const body = document.body;
  const nav = document.querySelector("#mobileBottomNav");
  const viewLabel = document.querySelector("#mobileViewLabel");
  const nearbyStatus = document.querySelector("#mobileNearbyStatus");
  const nearbyResults = document.querySelector("#mobileNearbyResults");
  const detailPanel = document.querySelector("#detailPanel");
  const navButtons = [...document.querySelectorAll("[data-mobile-view-target]")];
  let nearbyLoaded = false;
  let nearbyLoading = false;

  if (!nav || !detailPanel) return;

  function isMobile() {
    return MOBILE_QUERY.matches;
  }

  function setView(view, options = {}) {
    const allowed = new Set(["explore", "map", "nearby"]);
    const nextView = allowed.has(view) ? view : "map";
    body.dataset.mobileView = nextView;

    navButtons.forEach((button) => {
      const active = button.dataset.mobileViewTarget === nextView;
      if (active) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });

    if (viewLabel) {
      viewLabel.textContent = nextView === "map" ? "Map" : nextView === "nearby" ? "Nearby" : "Explore";
    }

    if (nextView === "nearby" && options.loadNearby !== false) loadNearby();

    if (nextView === "map") {
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event("resize"));
      });
    }
  }

  navButtons.forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.mobileViewTarget));
  });

  function prepareMobileSheet() {
    if (!isMobile() || detailPanel.hidden) return;

    detailPanel.classList.add("mobile-sheet-collapsed");
    const detailCard = detailPanel.querySelector(".detail-card");
    if (!detailCard || detailCard.querySelector(".mobile-sheet-expand")) return;

    const expandButton = document.createElement("button");
    expandButton.type = "button";
    expandButton.className = "mobile-sheet-expand";
    expandButton.textContent = "View full place details";
    expandButton.addEventListener("click", () => {
      detailPanel.classList.remove("mobile-sheet-collapsed");
      expandButton.setAttribute("aria-expanded", "true");
    });
    expandButton.setAttribute("aria-expanded", "false");
    detailCard.append(expandButton);
  }

  const detailObserver = new MutationObserver(() => {
    if (detailPanel.hidden) {
      detailPanel.classList.remove("mobile-sheet-collapsed");
      return;
    }
    prepareMobileSheet();
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
      nearbyStatus.textContent = "Nearest known BGG places based on your approximate device location. Distance is straight-line and does not confirm access or route conditions.";
    }

    nearbyResults.innerHTML = "";
    ranked.forEach(({ launch, miles }) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "mobile-nearby-card";
      button.innerHTML = `
        <span>
          <strong>${escapeHtml(launch.name)}</strong>
          <span>${escapeHtml(launch.region)}, ${escapeHtml(launch.state)} · ${escapeHtml(launch.skillLevel || "Skill unknown")}</span>
        </span>
        <span class="mobile-nearby-distance">${formatDistance(miles)}</span>
      `;
      button.addEventListener("click", () => {
        setView("map", { loadNearby: false });
        if (typeof window.openLaunchDetail === "function") {
          window.openLaunchDetail(launch.id);
        }
      });
      nearbyResults.append(button);
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

  function syncResponsiveState() {
    if (isMobile()) {
      if (!body.dataset.mobileView) setView("map", { loadNearby: false });
      prepareMobileSheet();
    } else {
      detailPanel.classList.remove("mobile-sheet-collapsed");
    }
  }

  MOBILE_QUERY.addEventListener?.("change", syncResponsiveState);
  syncResponsiveState();
})();
