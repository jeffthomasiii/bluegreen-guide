(() => {
  const collections = Array.isArray(window.BLUEGREEN_COLLECTIONS) ? window.BLUEGREEN_COLLECTIONS : [];
  const list = document.querySelector("#collectionsList");
  const description = document.querySelector("#collectionDescription");
  const clearButton = document.querySelector("#clearCollectionButton");
  const searchInput = document.querySelector("#searchInput");
  const sprite = "assets/icons/wayfinding.svg";

  if (!list || !description || !clearButton || !searchInput || !collections.length) return;

  const collectionIcons = {
    "beginner-favorites": { icon: "beginner", category: "neutral" },
    "family-friendly": { icon: "family", category: "neutral" },
    "calm-water": { icon: "water", category: "water" },
    "harbor-paddles": { icon: "marina", category: "water" },
    "scenic-views": { icon: "scenic", category: "neutral" },
  };

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
    const visual = collectionIcons[collection.id] || { icon: "check", category: "neutral" };
    const button = document.createElement("button");
    button.type = "button";
    button.className = `collection-button collection-${visual.category}`;
    button.setAttribute("aria-pressed", "false");
    button.innerHTML = `
      <span class="collection-icon" aria-hidden="true">
        <svg class="ui-icon" focusable="false"><use href="${sprite}#icon-${visual.icon}"></use></svg>
      </span>
      <span class="collection-copy">
        <strong>${escapeHtml(collection.name)}</strong>
        <small>${escapeHtml(collection.description)}</small>
      </span>
      <span class="collection-count">${collection.placeIds.length} places</span>
    `;
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
