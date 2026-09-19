(() => {
  const MOBILE_QUERY = window.matchMedia("(max-width: 720px)");
  const savedPanel = document.querySelector("#mobileSavedPanel");
  const morePanel = document.querySelector("#mobileMorePanel");
  const nearbyResults = document.querySelector("#mobileNearbyResults");
  const detailPanel = document.querySelector("#detailPanel");
  if (!savedPanel || !morePanel || !detailPanel) return;

  const KEYS = {
    saved: "bgg:saved-place-ids:v1",
    trips: "bgg:trips:v1",
    prefs: "bgg:preferences:v1",
  };
  const DEFAULT_PREFS = { locationEnabled: true, distanceUnit: "miles" };

  const read = (key, fallback) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  };
  const write = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  };

  let saved = new Set(Array.isArray(read(KEYS.saved, [])) ? read(KEYS.saved, []).filter(Boolean) : []);
  let trips = Array.isArray(read(KEYS.trips, [])) ? read(KEYS.trips, []).filter((trip) => trip?.id && trip?.name) : [];
  let prefs = { ...DEFAULT_PREFS, ...(read(KEYS.prefs, {}) || {}) };
  let activeTripId = null;
  let sheetContext = null;
  let toastTimer = null;
  let toastAction = null;

  const escapeHtml = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const iconPath = {
    saved: '<path d="M7 4h10a1 1 0 0 1 1 1v15l-6-3-6 3V5a1 1 0 0 1 1-1Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />',
    trip: '<path d="M4 17 9 7l3 6 2-4 6 8H4Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />',
    map: '<path d="m4 5 5-2 6 2 5-2v16l-5 2-6-2-5 2V5Zm5-2v16m6-14v16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />',
    share: '<circle cx="18" cy="5" r="2.2" fill="none" stroke="currentColor" stroke-width="1.8" /><circle cx="6" cy="12" r="2.2" fill="none" stroke="currentColor" stroke-width="1.8" /><circle cx="18" cy="19" r="2.2" fill="none" stroke="currentColor" stroke-width="1.8" /><path d="m8 11 8-5M8 13l8 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />',
    source: '<path d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6v6m0-6-9 9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />',
    plus: '<path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />',
    back: '<path d="m14.5 5-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" />',
    trash: '<path d="M5 7h14M9 7V4h6v3m-8 0 1 13h8l1-13M10 11v5m4-5v5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />',
    info: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8" /><path d="M12 11v6m0-10h.01" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />',
    location: '<path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" fill="none" stroke="currentColor" stroke-width="1.8" /><circle cx="12" cy="10" r="2.2" fill="currentColor" />',
    chevron: '<path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />',
  };
  const icon = (name) => `<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true">${iconPath[name] || iconPath.info}</svg>`;

  const placeById = (id) => (typeof window.BLUEGREEN_GET_PLACE_BY_ID === "function" ? window.BLUEGREEN_GET_PLACE_BY_ID(id) : null);
  const placeType = (place) => {
    if (place?.placeTypes?.length) return String(place.placeTypes[0]).replace(/-/g, " ");
    if (place?.spaceType === "green") return "Land place";
    if (place?.spaceType === "mixed") return "Water + land place";
    return place?.waterType || "Water place";
  };
  const placePhoto = (place) => {
    const photo = typeof window.BLUEGREEN_GET_PRIMARY_PHOTO === "function" ? window.BLUEGREEN_GET_PRIMARY_PHOTO(place) : null;
    return photo?.url || place?.photoUrls?.find?.((item) => item?.url)?.url || place?.image || "";
  };
  const thumb = (place) => {
    const url = placePhoto(place);
    return url
      ? `<span class="mobile-plan-thumb"><img src="${escapeHtml(url)}" alt="" loading="lazy" decoding="async" /></span>`
      : '<span class="mobile-plan-thumb mobile-plan-thumb-fallback" aria-hidden="true">BGG</span>';
  };

  const oldToast = document.querySelector(".mobile-toast");
  if (oldToast) oldToast.remove();
  const toast = document.createElement("div");
  toast.className = "mobile-toast mobile-toast-actions";
  toast.hidden = true;
  toast.innerHTML = '<span data-toast-message></span><button type="button" data-toast-action hidden></button>';
  document.body.append(toast);

  function showToast(message, actionLabel = "", action = null) {
    toast.querySelector("[data-toast-message]").textContent = message;
    const button = toast.querySelector("[data-toast-action]");
    toastAction = typeof action === "function" ? action : null;
    button.hidden = !actionLabel || !toastAction;
    button.textContent = actionLabel || "";
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.hidden = true;
      toastAction = null;
    }, 3600);
  }
  toast.querySelector("[data-toast-action]").addEventListener("click", () => {
    const action = toastAction;
    toast.hidden = true;
    toastAction = null;
    clearTimeout(toastTimer);
    action?.();
  });
  window.BLUEGREEN_SHOW_TOAST = showToast;

  const sheet = document.createElement("div");
  sheet.className = "mobile-action-sheet-backdrop";
  sheet.hidden = true;
  sheet.innerHTML = `
    <section class="mobile-action-sheet" role="dialog" aria-modal="true" aria-labelledby="mobileActionSheetTitle">
      <div class="mobile-action-sheet-handle" aria-hidden="true"></div>
      <header class="mobile-action-sheet-header">
        <div><h2 id="mobileActionSheetTitle"></h2><p data-sheet-subtitle hidden></p></div>
        <button type="button" data-sheet-close aria-label="Close">×</button>
      </header>
      <div class="mobile-action-sheet-body" data-sheet-body></div>
    </section>`;
  document.body.append(sheet);

  function showSheet(title, subtitle, markup, context = null) {
    sheetContext = context;
    sheet.querySelector("#mobileActionSheetTitle").textContent = title;
    const sub = sheet.querySelector("[data-sheet-subtitle]");
    sub.textContent = subtitle || "";
    sub.hidden = !subtitle;
    sheet.querySelector("[data-sheet-body]").innerHTML = markup;
    sheet.hidden = false;
    document.body.classList.add("mobile-sheet-open");
  }
  function closeSheet() {
    sheet.hidden = true;
    document.body.classList.remove("mobile-sheet-open");
    sheetContext = null;
  }

  const settings = document.createElement("section");
  settings.className = "mobile-settings-panel";
  settings.hidden = true;
  settings.innerHTML = `
    <header class="mobile-settings-header">
      <button type="button" data-close-settings aria-label="Back to More">${icon("back")}</button>
      <div><p class="eyebrow">BlueGreen Guide</p><h2>Settings</h2></div>
    </header>
    <div class="mobile-settings-groups">
      <section class="mobile-settings-card">
        <div class="mobile-settings-section-heading">${icon("location")}<span><strong>Location</strong><small>Nearby discovery</small></span></div>
        <label class="mobile-setting-row"><span><strong>Use device location</strong><small>Allow Nearby to request your approximate device location.</small></span><input type="checkbox" data-setting-location /></label>
      </section>
      <section class="mobile-settings-card">
        <div class="mobile-settings-section-heading">${icon("map")}<span><strong>Distance</strong><small>Choose how distances are shown.</small></span></div>
        <div class="mobile-setting-choice" role="radiogroup" aria-label="Distance units">
          <label><input type="radio" name="distanceUnit" value="miles" data-setting-distance /> Miles</label>
          <label><input type="radio" name="distanceUnit" value="kilometers" data-setting-distance /> Kilometers</label>
        </div>
      </section>
      <section class="mobile-settings-card">
        <div class="mobile-settings-section-heading">${icon("saved")}<span><strong>Data & privacy</strong><small>Saved places, trips, and preferences stay on this device in this build.</small></span></div>
        <div class="mobile-settings-stats"><span><strong data-saved-count>0</strong><small>Saved places</small></span><span><strong data-trip-count>0</strong><small>Trips</small></span></div>
        <div class="mobile-settings-data-actions">
          <button type="button" data-clear-saved>Clear Saved Places</button>
          <button type="button" data-clear-trips>Clear Trips</button>
          <button type="button" class="is-danger" data-reset-data>Reset app data</button>
        </div>
      </section>
    </div>`;
  document.body.append(settings);

  function syncSettings() {
    settings.querySelector("[data-setting-location]").checked = prefs.locationEnabled !== false;
    settings.querySelectorAll("[data-setting-distance]").forEach((input) => {
      input.checked = input.value === prefs.distanceUnit;
    });
    settings.querySelector("[data-saved-count]").textContent = String(saved.size);
    settings.querySelector("[data-trip-count]").textContent = String(trips.length);
  }
  function openSettings() {
    syncSettings();
    settings.hidden = false;
    settings.scrollTop = 0;
  }
  window.BLUEGREEN_OPEN_SETTINGS = openSettings;
  settings.querySelector("[data-close-settings]").addEventListener("click", () => (settings.hidden = true));
  settings.querySelector("[data-setting-location]").addEventListener("change", (event) => {
    prefs.locationEnabled = event.target.checked;
    write(KEYS.prefs, prefs);
    window.BLUEGREEN_LOCATION_PREFERENCE_CHANGED?.(prefs.locationEnabled);
  });
  settings.querySelectorAll("[data-setting-distance]").forEach((input) => {
    input.addEventListener("change", (event) => {
      if (!event.target.checked) return;
      prefs.distanceUnit = event.target.value === "kilometers" ? "kilometers" : "miles";
      write(KEYS.prefs, prefs);
      window.BLUEGREEN_DISTANCE_PREFERENCE_CHANGED?.();
    });
  });

  const originalSettingsButton = morePanel.querySelector("[data-settings-placeholder]");
  if (originalSettingsButton) {
    const replacement = originalSettingsButton.cloneNode(true);
    replacement.removeAttribute("data-settings-placeholder");
    replacement.setAttribute("data-open-settings", "");
    replacement.querySelector("small").textContent = "App preferences";
    originalSettingsButton.replaceWith(replacement);
    replacement.addEventListener("click", openSettings);
  }

  const savedHeadingCopy = savedPanel.querySelector(".mobile-saved-heading p:last-child");
  if (savedHeadingCopy) savedHeadingCopy.textContent = "Keep places you want to remember and group them into future trips.";

  const placesPanel = savedPanel.querySelector('[data-saved-panel="places"]');
  const tripsPanel = savedPanel.querySelector('[data-saved-panel="trips"]');

  function persistSaved() {
    write(KEYS.saved, [...saved]);
  }
  function isSaved(id) {
    return saved.has(id);
  }
  window.BLUEGREEN_IS_SAVED_PLACE = isSaved;

  function setSaved(id, value, withToast = true) {
    const place = placeById(id);
    if (!place) return;
    const before = saved.has(id);
    if (value) saved.add(id);
    else saved.delete(id);
    if (before === value) return;
    persistSaved();
    renderSaved();
    syncButtons();
    syncSettings();
    if (withToast) {
      showToast(value ? "Saved to Saved Places." : "Removed from Saved Places.", "Undo", () => setSaved(id, before, false));
    }
  }
  function toggleSaved(id) {
    setSaved(id, !saved.has(id));
  }
  window.BLUEGREEN_TOGGLE_SAVED_PLACE = toggleSaved;

  function syncButtons() {
    document.querySelectorAll("[data-nearby-save][data-place-id]").forEach((button) => {
      const yes = saved.has(button.dataset.placeId);
      button.classList.toggle("is-saved", yes);
      button.setAttribute("aria-pressed", String(yes));
    });
    detailPanel.querySelectorAll("[data-save-place-id]").forEach((button) => {
      const yes = saved.has(button.dataset.savePlaceId);
      button.classList.toggle("is-saved", yes);
      button.setAttribute("aria-pressed", String(yes));
      const label = button.querySelector("span");
      const next = yes ? "Saved" : "Save";
      if (label && label.textContent !== next) label.textContent = next;
    });
  }
  window.BLUEGREEN_SYNC_SAVE_BUTTONS = syncButtons;

  function renderSaved() {
    const places = [...saved].map(placeById).filter(Boolean);
    if (!places.length) {
      placesPanel.innerHTML = `
        <section class="mobile-saved-placeholder">
          ${icon("saved")}<h3>Saved Places</h3>
          <p>Bookmark places you want to remember. They will stay saved on this device.</p>
          <button type="button" data-go-explore>Explore places</button>
        </section>`;
      placesPanel.querySelector("[data-go-explore]")?.addEventListener("click", () => window.BLUEGREEN_SET_MOBILE_VIEW?.("explore"));
      return;
    }
    placesPanel.innerHTML = `
      <div class="mobile-saved-list-heading"><strong>${places.length} saved ${places.length === 1 ? "place" : "places"}</strong><small>Stored on this device</small></div>
      <div class="mobile-saved-list">${places.map((place) => `
        <article class="mobile-saved-place-card">
          <button type="button" class="mobile-saved-place-main" data-open-saved="${escapeHtml(place.id)}">${thumb(place)}<span><strong>