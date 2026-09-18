(() => {
  const MOBILE_QUERY = window.matchMedia("(max-width: 720px)");
  const body = document.body;
  const nav = document.querySelector("#mobileBottomNav");
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

  function closeCurrentDetail() {
    if (detailPanel.hidden) return;
    const closeButton = detailPanel.querySelector("[data-close-detail]");
    if (closeButton) closeButton.click();
  }

  function setView(view, options = {}) {
    const allowed = new Set(["explore", "map", "nearby"]);
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
  }

  navButtons.forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.mobileViewTarget));
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
    return `<span class="mobile-nearby-thumb mobile-nearby-thumb-fallback ${className}" aria-hidden="true"></span>`;
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
      const button = document.createElement("button");
      button.type = "button";
      button.className = "mobile-nearby-card";
      button.innerHTML = `
        ${nearbyThumbMarkup(launch)}
        <span class="mobile-nearby-copy">
          <strong>${escapeHtml(launch.name)}</strong>
          <span>${escapeHtml(launch.region)}, ${escapeHtml(launch.state)} · ${escapeHtml(placeTypeLabel(launch))}</span>
        </span>
        <span class="mobile-nearby-distance">${formatDistance(miles)}</span>
      `;
      button.addEventListener("click", () => openNearbyDetail(launch));
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

  function escapeAttribute(value) {
    return escapeHtml(value);
  }

  function syncResponsiveState() {
    if (isMobile()) {
      if (!body.dataset.mobileView) setView("map", { loadNearby: false });
      prepareMobileDetail();
    } else {
      detailPanel.classList.remove("mobile-sheet-collapsed", "mobile-detail-expanded");
    }
  }

  MOBILE_QUERY.addEventListener?.("change", syncResponsiveState);
  syncResponsiveState();
})();
