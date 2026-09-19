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
          <button type="button" class="mobile-saved-place-main" data-open-saved="${escapeHtml(place.id)}">${thumb(place)}<span><strong>${escapeHtml(place.name)}</strong><small>${escapeHtml(place.region)}, ${escapeHtml(place.state)} · ${escapeHtml(placeType(place))}</small></span></button>
          <button type="button" class="mobile-saved-place-action is-saved" data-unsave="${escapeHtml(place.id)}" aria-label="Remove ${escapeHtml(place.name)}">${icon("saved")}</button>
          <button type="button" class="mobile-saved-place-action" data-more="${escapeHtml(place.id)}" aria-label="More options for ${escapeHtml(place.name)}"><span aria-hidden="true">•••</span></button>
        </article>`).join("")}</div>`;
    placesPanel.querySelectorAll("[data-open-saved]").forEach((button) => button.addEventListener("click", () => window.openLaunchDetail?.(button.dataset.openSaved, { focusMap: false })));
    placesPanel.querySelectorAll("[data-unsave]").forEach((button) => button.addEventListener("click", () => toggleSaved(button.dataset.unsave)));
    placesPanel.querySelectorAll("[data-more]").forEach((button) => button.addEventListener("click", () => openPlaceActions(placeById(button.dataset.more))));
  }

  function tripDates(trip) {
    const fmt = (value) => {
      if (!value) return "";
      const d = new Date(`${value}T12:00:00`);
      return Number.isNaN(d.getTime()) ? value : new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" }).format(d);
    };
    if (trip.startDate && trip.endDate) return `${fmt(trip.startDate)} – ${fmt(trip.endDate)}`;
    return fmt(trip.startDate || trip.endDate) || "Dates not set";
  }

  function renderTrips() {
    const trip = activeTripId ? trips.find((item) => item.id === activeTripId) : null;
    if (trip) return renderTripEditor(trip);
    if (!trips.length) {
      tripsPanel.innerHTML = `
        <section class="mobile-saved-placeholder">
          ${icon("trip")}<h3>My Trips</h3>
          <p>Group BlueGreen Guide places into a simple trip plan. Trip data stays on this device.</p>
          <button type="button" data-new-trip>${icon("plus")}<span>Create a Trip</span></button>
        </section>`;
      tripsPanel.querySelector("[data-new-trip]")?.addEventListener("click", () => openCreateTrip());
      return;
    }
    tripsPanel.innerHTML = `
      <div class="mobile-trips-toolbar"><div><strong>${trips.length} ${trips.length === 1 ? "trip" : "trips"}</strong><small>Stored on this device</small></div><button type="button" data-new-trip>${icon("plus")}<span>New trip</span></button></div>
      <div class="mobile-trip-list">${trips.map((trip) => `
        <button type="button" class="mobile-trip-card" data-trip="${escapeHtml(trip.id)}"><span class="mobile-trip-icon">${icon("trip")}</span><span><strong>${escapeHtml(trip.name)}</strong><small>${escapeHtml(tripDates(trip))}</small><em>${trip.placeIds?.length || 0} ${(trip.placeIds?.length || 0) === 1 ? "place" : "places"}</em></span>${icon("chevron")}</button>`).join("")}</div>`;
    tripsPanel.querySelector("[data-new-trip]")?.addEventListener("click", () => openCreateTrip());
    tripsPanel.querySelectorAll("[data-trip]").forEach((button) => button.addEventListener("click", () => {
      activeTripId = button.dataset.trip;
      renderTrips();
    }));
  }

  function renderTripEditor(trip) {
    const places = (trip.placeIds || []).map(placeById).filter(Boolean);
    tripsPanel.innerHTML = `
      <section class="mobile-trip-editor">
        <div class="mobile-trip-editor-heading"><button type="button" data-trip-back aria-label="Back to trips">${icon("back")}</button><div><p class="eyebrow">My Trip</p><h3>${escapeHtml(trip.name)}</h3><small>${escapeHtml(tripDates(trip))}</small></div></div>
        ${trip.notes ? `<p class="mobile-trip-notes">${escapeHtml(trip.notes)}</p>` : ""}
        <div class="mobile-trip-place-list">${places.length ? places.map((place, index) => `
          <article class="mobile-trip-place">
            <button type="button" class="mobile-trip-place-main" data-trip-place="${escapeHtml(place.id)}">${thumb(place)}<span><strong>${escapeHtml(place.name)}</strong><small>${escapeHtml(place.region)}, ${escapeHtml(place.state)}</small></span></button>
            <div class="mobile-trip-place-controls"><button type="button" data-move="${escapeHtml(place.id)}" data-dir="up" ${index === 0 ? "disabled" : ""}>↑</button><button type="button" data-move="${escapeHtml(place.id)}" data-dir="down" ${index === places.length - 1 ? "disabled" : ""}>↓</button><button type="button" data-remove="${escapeHtml(place.id)}">Remove</button></div>
          </article>`).join("") : '<div class="mobile-trip-empty"><p>No places are in this trip yet.</p><small>Open a place and choose Add to Trip from the ••• menu.</small></div>'}</div>
        <div class="mobile-trip-editor-actions"><button type="button" data-explore>Explore places</button><button type="button" class="is-danger" data-delete-trip>${icon("trash")}<span>Delete trip</span></button></div>
      </section>`;
    tripsPanel.querySelector("[data-trip-back]").addEventListener("click", () => {
      activeTripId = null;
      renderTrips();
    });
    tripsPanel.querySelector("[data-explore]").addEventListener("click", () => window.BLUEGREEN_SET_MOBILE_VIEW?.("explore"));
    tripsPanel.querySelectorAll("[data-trip-place]").forEach((button) => button.addEventListener("click", () => window.openLaunchDetail?.(button.dataset.tripPlace, { focusMap: false })));
    tripsPanel.querySelectorAll("[data-remove]").forEach((button) => button.addEventListener("click", () => {
      trip.placeIds = trip.placeIds.filter((id) => id !== button.dataset.remove);
      trip.updatedAt = new Date().toISOString();
      write(KEYS.trips, trips);
      renderTrips();
    }));
    tripsPanel.querySelectorAll("[data-move]").forEach((button) => button.addEventListener("click", () => {
      const current = trip.placeIds.indexOf(button.dataset.move);
      const next = button.dataset.dir === "up" ? current - 1 : current + 1;
      if (current < 0 || next < 0 || next >= trip.placeIds.length) return;
      [trip.placeIds[current], trip.placeIds[next]] = [trip.placeIds[next], trip.placeIds[current]];
      trip.updatedAt = new Date().toISOString();
      write(KEYS.trips, trips);
      renderTrips();
    }));
    tripsPanel.querySelector("[data-delete-trip]").addEventListener("click", () => {
      showSheet(`Delete ${trip.name}?`, "This trip will be removed from this device. Saved Places are not affected.", '<button type="button" class="mobile-sheet-action is-danger" data-delete-confirm>Delete trip</button><button type="button" class="mobile-sheet-action" data-sheet-close>Cancel</button>', { trip });
      sheet.querySelector("[data-delete-confirm]").addEventListener("click", () => {
        trips = trips.filter((item) => item.id !== trip.id);
        activeTripId = null;
        write(KEYS.trips, trips);
        renderTrips();
        syncSettings();
        closeSheet();
        showToast("Trip deleted.");
      }, { once: true });
    });
  }

  function openCreateTrip(pendingPlace = null) {
    showSheet("Create a Trip", pendingPlace ? `Start with ${pendingPlace.name}` : "Keep a simple plan on this device.", `
      <form class="mobile-trip-form" data-trip-form>
        <label><span>Trip name</span><input name="name" maxlength="80" required placeholder="Yosemite Weekend" /></label>
        <div class="mobile-trip-form-dates"><label><span>Start date <small>optional</small></span><input name="startDate" type="date" /></label><label><span>End date <small>optional</small></span><input name="endDate" type="date" /></label></div>
        <label><span>Notes <small>optional</small></span><textarea name="notes" rows="3" maxlength="500" placeholder="Anything you want to remember…"></textarea></label>
        <button type="submit" class="mobile-trip-form-submit">Create Trip</button>
      </form>`, { pendingPlace });
  }

  function openAddToTrip(place) {
    const rows = trips.length ? trips.map((trip) => {
      const added = (trip.placeIds || []).includes(place.id);
      return `<button type="button" class="mobile-trip-picker-row ${added ? "is-added" : ""}" data-trip-choice="${escapeHtml(trip.id)}" ${added ? "disabled" : ""}><span>${icon("trip")}<strong>${escapeHtml(trip.name)}</strong></span><small>${added ? "Added" : `${trip.placeIds?.length || 0} ${(trip.placeIds?.length || 0) === 1 ? "place" : "places"}`}</small></button>`;
    }).join("") : '<p class="mobile-sheet-empty">You have not created a trip yet.</p>';
    showSheet("Add to a Trip", place.name, `${rows}<button type="button" class="mobile-sheet-action mobile-sheet-create" data-new-from-place>${icon("plus")}<span><strong>Create new trip</strong><small>Start a trip with this place</small></span></button>`, { place });
  }

  function firstSource(place) {
    return (place?.sourceUrls || []).map((source) => (typeof source === "string" ? source : source?.url)).find(Boolean) || "";
  }

  function openPlaceActions(place) {
    if (!place) return;
    const source = firstSource(place);
    showSheet(place.name, `${place.region}, ${place.state}`, `
      <button type="button" class="mobile-sheet-action" data-action="details">${icon("info")}<span><strong>View place details</strong><small>Open the full BlueGreen Guide profile</small></span></button>
      <button type="button" class="mobile-sheet-action" data-action="trip">${icon("trip")}<span><strong>Add to trip</strong><small>Group this place into a trip</small></span></button>
      <button type="button" class="mobile-sheet-action" data-action="maps">${icon("map")}<span><strong>Open in Maps</strong><small>Get route options in your maps app</small></span></button>
      <button type="button" class="mobile-sheet-action" data-action="share">${icon("share")}<span><strong>Share place</strong><small>Share a direct BlueGreen Guide link</small></span></button>
      ${source ? `<button type="button" class="mobile-sheet-action" data-action="source">${icon("source")}<span><strong>Official source</strong><small>Open the first listed source</small></span></button>` : ""}`, { place });
  }
  window.BLUEGREEN_OPEN_PLACE_ACTIONS = openPlaceActions;

  async function sharePlace(place) {
    const url = new URL(location.href);
    url.search = "";
    url.hash = "";
    url.searchParams.set("view", "explore");
    url.searchParams.set("place", place.id);
    const data = { title: place.name, text: `${place.name} on BlueGreen Guide`, url: url.toString() };
    if (navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch (error) {
        if (error?.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(`${data.text}\n${data.url}`);
      showToast("Place link copied.");
    } catch {
      showToast("Sharing is not available in this browser.");
    }
  }

  function formatDistance(miles) {
    if (prefs.distanceUnit === "kilometers") {
      const km = miles * 1.609344;
      return km < 0.1 ? "<0.1 km" : km < 10 ? `${km.toFixed(1)} km` : `${Math.round(km)} km`;
    }
    return miles < 0.1 ? "<0.1 mi" : miles < 10 ? `${miles.toFixed(1)} mi` : `${Math.round(miles)} mi`;
  }
  window.BLUEGREEN_FORMAT_DISTANCE = formatDistance;
  window.BLUEGREEN_LOCATION_ALLOWED = () => prefs.locationEnabled !== false;

  sheet.addEventListener("click", (event) => {
    if (event.target === sheet || event.target.closest("[data-sheet-close]")) return closeSheet();
    const choice = event.target.closest("[data-trip-choice]");
    if (choice && sheetContext?.place) {
      const trip = trips.find((item) => item.id === choice.dataset.tripChoice);
      if (!trip || (trip.placeIds || []).includes(sheetContext.place.id)) return;
      trip.placeIds = [...(trip.placeIds || []), sheetContext.place.id];
      trip.updatedAt = new Date().toISOString();
      write(KEYS.trips, trips);
      renderTrips();
      syncSettings();
      closeSheet();
      showToast(`Added to ${trip.name}.`);
      return;
    }
    if (event.target.closest("[data-new-from-place]") && sheetContext?.place) return openCreateTrip(sheetContext.place);
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (action && sheetContext?.place) {
      const place = sheetContext.place;
      if (action === "details") {
        closeSheet();
        return window.openLaunchDetail?.(place.id, { focusMap: false });
      }
      if (action === "trip") return openAddToTrip(place);
      if (action === "maps") {
        closeSheet();
        const lat = Number(place.lat);
        const lng = Number(place.lng);
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return showToast("Map coordinates are not available for this place.");
        return window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${lat},${lng}`)}`, "_blank", "noopener");
      }
      if (action === "share") {
        closeSheet();
        return sharePlace(place);
      }
      if (action === "source") {
        const source = firstSource(place);
        closeSheet();
        if (source) window.open(source, "_blank", "noopener");
      }
    }
    if (event.target.closest("[data-confirm-clear-saved]")) {
      saved.clear();
      persistSaved();
      renderSaved();
      syncButtons();
      syncSettings();
      closeSheet();
      return showToast("Saved Places cleared.");
    }
    if (event.target.closest("[data-confirm-clear-trips]")) {
      trips = [];
      activeTripId = null;
      write(KEYS.trips, trips);
      renderTrips();
      syncSettings();
      closeSheet();
      return showToast("Trips cleared.");
    }
    if (event.target.closest("[data-confirm-reset]")) {
      saved.clear();
      trips = [];
      activeTripId = null;
      prefs = { ...DEFAULT_PREFS };
      persistSaved();
      write(KEYS.trips, trips);
      write(KEYS.prefs, prefs);
      renderSaved();
      renderTrips();
      syncButtons();
      syncSettings();
      closeSheet();
      window.BLUEGRE