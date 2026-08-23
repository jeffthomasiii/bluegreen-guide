(() => {
  const MOBILE_QUERY = window.matchMedia("(max-width: 720px)");
  const RESULTS_LIMIT = 10;
  const body = document.body;
  const results = document.querySelector("#resultsList");

  if (!results) return;

  let expanded = false;

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "mobile-explore-toggle";
  toggle.hidden = true;
  toggle.setAttribute("aria-controls", "resultsList");
  results.insertAdjacentElement("afterend", toggle);

  function isCollapsedExplore() {
    return MOBILE_QUERY.matches && body.dataset.mobileView === "explore";
  }

  function applyLimit() {
    const cards = [...results.querySelectorAll(":scope > .launch-card")];

    if (!isCollapsedExplore() || cards.length <= RESULTS_LIMIT) {
      cards.forEach((card) => { card.hidden = false; });
      toggle.hidden = true;
      toggle.setAttribute("aria-expanded", "true");
      return;
    }

    cards.forEach((card, index) => {
      card.hidden = !expanded && index >= RESULTS_LIMIT;
    });

    toggle.hidden = false;
    toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    toggle.textContent = expanded
      ? "Show fewer places"
      : `Show all ${cards.length} places`;
  }

  toggle.addEventListener("click", () => {
    expanded = !expanded;
    applyLimit();
    if (!expanded) results.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  const resultsObserver = new MutationObserver(() => {
    expanded = false;
    applyLimit();
  });
  resultsObserver.observe(results, { childList: true });

  const viewObserver = new MutationObserver(() => applyLimit());
  viewObserver.observe(body, { attributes: true, attributeFilter: ["data-mobile-view"] });

  MOBILE_QUERY.addEventListener?.("change", applyLimit);
  applyLimit();
})();
