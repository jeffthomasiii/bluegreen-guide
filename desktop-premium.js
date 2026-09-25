(() => {
  const desktopQuery = window.matchMedia("(min-width: 901px)");
  const desktopSearch = document.querySelector("#desktopSearchInput");
  const appSearch = document.querySelector("#searchInput");
  const tabs = [...document.querySelectorAll("[data-desktop-tab]")];
  const navItems = [...document.querySelectorAll("[data-desktop-nav]")];
  const menuButton = document.querySelector("[data-desktop-menu]");
  const savedPanel = document.querySelector("#mobileSavedPanel");

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