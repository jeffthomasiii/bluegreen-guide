(() => {
  const desktopQuery = window.matchMedia("(min-width: 901px)");
  const desktopSearch = document.querySelector("#desktopSearchInput");
  const appSearch = document.querySelector("#searchInput");
  const tabs = [...document.querySelectorAll("[data-desktop-tab]")];
  const navItems = [...document.querySelectorAll("[data-desktop-nav]")];
  const menuButton = document.querySelector("[data-desktop-menu]");
  const savedPanel = document.querySelector("#mobileSavedPanel");
  const desktopResultCount = document.querySelector("#desktopResultCount");
  const resultCount = document.querySelector("#resultCount");
  const clearFilters = document.querySelector("[data-desktop-clear-filters]");
  const showPlaces = document.querySelector("[data-desktop-show-places]");

  function setTab(tab) {
    document.body.dataset.desktopActiveTab = tab;
    tabs.forEach((button) => {
      const active = button.dataset.desktopTab === tab;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", active ? "true" : "false");
    });
  }

  function closeSavedDrawer() {
    document.body.classList.remove("desktop-saved-open");
  }

  function setPrimary(active) {
    navItems.forEach((item) => {
      const isActive = item.dataset.desktopNav === active;
      item.classList.toggle("is-active", isActive);
      if (isActive) item.setAttribute("aria-current", "page");
      else item.removeAttribute("aria-current");
    });
  }

  function openSavedTab(tab) {
    if (!desktopQuery.matches || !savedPanel) return;
    document.body.classList.add("desktop-saved-open");
    const button = savedPanel.querySelector(`[data-saved-tab="${tab}"]`);
    button?.click();
  }

  tabs.forEach((button) => {
    button.addEventListener("click", () => {
      closeSavedDrawer();
      setTab(button.dataset.desktopTab || "filters");
    });
  });

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      const target = item.dataset.desktopNav;
      if (!target) return;
      setPrimary(target);
      if (target === "map") {
        closeSavedDrawer();
        setTab("filters");
      } else if (target === "collections") {
        closeSavedDrawer();
        setTab("collections");
      } else if (target === "saved") {
        openSavedTab("places");
      } else if (target === "trips") {
        openSavedTab("trips");
      }
    });
  });

  const syncDesktopCount = () => {
    if (desktopResultCount && resultCount) desktopResultCount.textContent = resultCount.textContent || "0";
  };

  const countObserver = resultCount ? new MutationObserver(syncDesktopCount) : null;
  if (resultCount && countObserver) countObserver.observe(resultCount, { childList: true, characterData: true, subtree: true });
  syncDesktopCount();

  clearFilters?.addEventListener("click", () => {
    if (appSearch) {
      appSearch.value = "";
      appSearch.dispatchEvent(new Event("input", { bubbles: true }));
    }
    ["regionFilter", "skillFilter", "activityFilter", "difficultyFilter"].forEach((id) => {
      const control = document.getElementById(id);
      if (!control) return;
      control.value = "all";
      control.dispatchEvent(new Event("change", { bubbles: true }));
    });
    document.querySelector("#clearCollectionButton:not([hidden])")?.click();
    if (desktopSearch) desktopSearch.value = "";
    setTab("filters");
  });

  showPlaces?.addEventListener("click", () => {
    document.querySelector("#fitButton")?.click();
  });

  desktopSearch?.addEventListener("input", () => {
    if (!appSearch) return;
    appSearch.value = desktopSearch.value;
    appSearch.dispatchEvent(new Event("input", { bubbles: true }));
    setTab("filters");
  });

  appSearch?.addEventListener("input", () => {
    if (desktopSearch && desktopSearch.value !== appSearch.value) desktopSearch.value = appSearch.value;
  });

  menuButton?.addEventListener("click", () => {
    let menu = document.querySelector(".desktop-menu-popover");
    if (!menu) {
      menu = document.createElement("div");
      menu.className = "desktop-menu-popover";
      menu.innerHTML = `
        <a href="docs/">Documentation</a>
        <a href="docs/blue-and-green-spaces/">Blue + Green Spaces</a>
        <a href="docs/launch-suitability/">Planning Guidance</a>
        <a href="docs/roadmap/">Roadmap</a>
      `;
      document.body.append(menu);
    }
    menu.classList.toggle("is-open");
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-desktop-menu]") || event.target.closest(".desktop-menu-popover")) return;
    document.querySelector(".desktop-menu-popover")?.classList.remove("is-open");
  });

  if (savedPanel && !savedPanel.querySelector(".desktop-saved-close")) {
    const close = document.createElement("button");
    close.type = "button";
    close.className = "desktop-saved-close";
    close.setAttribute("aria-label", "Close saved places and trips");
    close.textContent = "×";
    close.addEventListener("click", () => {
      closeSavedDrawer();
      setPrimary("map");
    });
    savedPanel.prepend(close);
  }

  setTab("filters");
})();