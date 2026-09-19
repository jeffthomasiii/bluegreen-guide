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
    document.body.classList.rem