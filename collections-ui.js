(() => {
  const collections = Array.isArray(window.BLUEGREEN_COLLECTIONS) ? window.BLUEGREEN_COLLECTIONS : [];
  const list = document.querySelector("#collectionsList");
  const description = document.querySelector("#collectionDescription");
  const clearButton = document.querySelector("#clearCollectionButton");
  const searchInput = document.querySelector("#searchInput");

  if (!list || !description || !clearButton || !searchInput || !collections.length) return;

  const setCollection = (collection, button) => {
    list.querySelectorAll(".collection-button").forEach((item) => {
      item.classList.toggle("is-active", item === button);
      item.setAttribute("aria-pressed", item === button ? "true" : "false");
    });

    searchInput.value = collection.query;
    searchInput.dispatchEvent(new Event("input", { bubbles: true }));
    description.textContent = collection.description;
    clearButton.hidden = false;
  };

  collections.forEach((collection) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "collection-button";
    button.setAttribute("aria-pressed", "false");
    button.innerHTML = `<strong>${escapeHtml(collection.name)}</strong><span>${collection.placeIds.length} places</span>`;
    button.addEventListener("click", () => setCollection(collection, button));
    list.append(button);
  });

  clearButton.addEventListener("click", () => {
    list.querySelectorAll(".collection-button").forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-pressed", "false");
    });
    searchInput.value = "";
    searchInput.dispatchEvent(new Event("input", { bubbles: true }));
    description.textContent = "Choose a collection to filter the current launch map.";
    clearButton.hidden = true;
  });

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
