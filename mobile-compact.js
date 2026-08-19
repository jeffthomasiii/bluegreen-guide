(() => {
  const MOBILE_QUERY = window.matchMedia("(max-width: 720px)");
  const sprite = "assets/icons/wayfinding.svg";
  const body = document.body;
  const sidebar = document.querySelector(".sidebar");
  const mapPanel = document.querySelector(".map-panel");
  const wayfinding = document.querySelector(".wayfinding-key");
  const collections = document.querySelector(".collections-panel");
  const original = {
    search: document.querySelector("#searchInput"),
    region: document.querySelector("#regionFilter"),
    skill: document.querySelector("#skillFilter"),
    activity: document.querySelector("#activityFilter"),
    difficulty: document.querySelector("#difficultyFilter"),
    bounds: document.querySelector("#boundsButton"),
    fit: document.querySelector("#fitButton"),
    location: document.querySelector("#locationButton"),
  };

  if (!sidebar || !mapPanel || !wayfinding || !collections || !original.search) return;

  window.BLUEGREEN_MOBILE_SPACE_TYPE = window.BLUEGREEN_MOBILE_SPACE_TYPE || "all";

  const icon = (name) => `<svg class="ui-icon" aria-hidden="true" focusable="false"><use href="${sprite}#icon-${name}"></use></svg>`;

  const exploreTools = document.createElement("section");
  exploreTools.className = "mobile-compact-explore";
  exploreTools.setAttribute("aria-label", "Explore places");
  exploreTools.innerHTML = `
    <label class="mobile-basic-search">
      <span class="sr-only">Search places</span>
      ${icon("search")}
      <input id="mobileExploreSearch" type="search" placeholder="Search places" autocomplete="off" />
    </label>
    <div class="mobile-discovery-row" aria-label="Place type filters">
      <button type="button" class="mobile-discovery-chip chip-water" data-mobile-space="blue" aria-pressed="false">${icon("water")}<span>Water</span></button>
      <button type="button" class="mobile-discovery-chip chip-land" data-mobile-space="green" aria-pressed="false">${icon("park")}<span>Land</span></button>
      <button type="button" class="mobile-discovery-chip chip-neutral" data-open-mobile-filters>${icon("check")}<span>Amenities</span></button>
      <button type="button" class="mobile-advanced-link" data-open-mobile-filters>${icon("filter")}<span>Filters</span></button>
    </div>
  `;
  sidebar.insertBefore(exploreTools, wayfinding);

  const mapTools = document.createElement("div");
  mapTools.className = "mobile-map-tools";
  mapTools.innerHTML = `
    <label class="mobile-map-search">
      <span class="sr-only">Search places</span>
      ${icon("search")}
      <input id="mobileMapSearch" type="search" placeholder="Search places" autocomplete="off" />
    </label>
    <button type="button" class="mobile-map-filter" data-open-mobile-filters aria-label="Advanced filters">${icon("filter")}</button>
    <button type="button" class="mobile-search-area">Search this area</button>
  `;
  mapPanel.append(mapTools);

  const filterSheet = document.createElement("div");
  filterSheet.className = "mobile-filter-sheet";
  filterSheet.hidden = true;
  filterSheet.innerHTML = `
    <button type="button" class="mobile-filter-backdrop" data-close-mobile-filters aria-label="Close filters"></button>
    <section class="mobile-filter-card" role="dialog" aria-modal="true" aria-labelledby="mobileFilterTitle">
      <div class="mobile-filter-handle" aria-hidden="true"></div>
      <div class="mobile-filter-heading">
        <div><p class="eyebrow">Explore</p><h2 id="mobileFilterTitle">Advanced filters</h2></div>
        <button type="button" class="mobile-filter-close" data-close-mobile-filters aria-label="Close filters">&times;</button>
      </div>
      <div class="mobile-filter-fields">
        <label><span>Region</span><select data-proxy-filter="region"></select></label>
        <label><span>Paddling skill</span><select data-proxy-filter="skill"></select></label>
        <label><span>Water activity</span><select data-proxy-filter="activity"></select></label>
        <label><span>Maximum difficulty</span><select data-proxy-filter="difficulty"></select></label>
      </div>
      <div class="mobile-filter-actions-secondary">
        <button type="button" data-mobile-location>${icon("location")}<span>Use my location</span></button>
        <button type="button" data-mobile-fit>${icon("map")}<span>Fit all places</span></button>
      </div>
      <div class="mobile-filter-actions">
        <button type="button" class="mobile-filter-reset">Reset</button>
        <button type="button" class="mobile-filter-apply">Apply filters</button>
      </div>
    </section>
  `;
  body.append(filterSheet);

  const exploreSearch = exploreTools.querySelector("#mobileExploreSearch");
  const mapSearch = mapTools.querySelector("#mobileMapSearch");
  const spaceButtons = [...exploreTools.querySelectorAll("[data-mobile-space]")];
  const proxySelects = [...filterSheet.querySelectorAll("[data-proxy-filter]")];

  function refreshResults() {
    original.search.dispatchEvent(new Event("input", { bubbles: true }));
  }

  function setSearch(value, source) {
    original.search.value = value;
    if (source !== exploreSearch) exploreSearch.value = value;
    if (source !== mapSearch) mapSearch.value = value;
    refreshResults();
  }

  [exploreSearch, mapSearch].forEach((input) => {
    input.value = original.search.value;
    input.addEventListener("input", () => setSearch(input.value, input));
  });

  function setSpaceType(type) {
    const next = window.BLUEGREEN_MOBILE_SPACE_TYPE === type ? "all" : type;
    window.BLUEGREEN_MOBILE_SPACE_TYPE = next;
    spaceButtons.forEach((button) => {
      button.setAttribute("aria-pressed", button.dataset.mobileSpace === next ? "true" : "false");
    });
    refreshResults();
  }

  spaceButtons.forEach((button) => button.addEventListener("click", () => setSpaceType(button.dataset.mobileSpace)));

  function syncProxySelects() {
    proxySelects.forEach((proxy) => {
      const key = proxy.dataset.proxyFilter;
      const source = original[key];
      if (!source) return;
      proxy.innerHTML = source.innerHTML;
      proxy.value = source.value;
    });
  }

  function openFilters() {
    syncProxySelects();
    filterSheet.hidden = false;
    body.classList.add("mobile-filters-open");
    requestAnimationFrame(() => filterSheet.querySelector("select")?.focus({ preventScroll: true }));
  }

  function closeFilters() {
    filterSheet.hidden = true;
    body.classList.remove("mobile-filters-open");
  }

  document.querySelectorAll("[data-open-mobile-filters]").forEach((button) => button.addEventListener("click", openFilters));
  filterSheet.querySelectorAll("[data-close-mobile-filters]").forEach((button) => button.addEventListener("click", closeFilters));

  proxySelects.forEach((proxy) => {
    proxy.addEventListener("change", () => {
      const source = original[proxy.dataset.proxyFilter];
      if (!source) return;
      source.value = proxy.value;
      refreshResults();
    });
  });

  filterSheet.querySelector(".mobile-filter-apply")?.addEventListener("click", closeFilters);
  filterSheet.querySelector(".mobile-filter-reset")?.addEventListener("click", () => {
    original.region.value = "all";
    original.skill.value = "all";
    original.activity.value = "all";
    original.difficulty.value = "all";
    window.BLUEGREEN_MOBILE_SPACE_TYPE = "all";
    setSearch("", null);
    spaceButtons.forEach((button) => button.setAttribute("aria-pressed", "false"));
    syncProxySelects();
  });

  filterSheet.querySelector("[data-mobile-location]")?.addEventListener("click", () => original.location?.click());
  filterSheet.querySelector("[data-mobile-fit]")?.addEventListener("click", () => {
    original.fit?.click();
    closeFilters();
  });

  mapTools.querySelector(".mobile-search-area")?.addEventListener("click", () => original.bounds?.click());

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !filterSheet.hidden) closeFilters();
  });

  function syncResponsiveState() {
    if (!MOBILE_QUERY.matches) {
      closeFilters();
      window.BLUEGREEN_MOBILE_SPACE_TYPE = "all";
    }
  }

  MOBILE_QUERY.addEventListener?.("change", syncResponsiveState);
})();
