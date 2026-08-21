const markerMinZoom = new Map([
  ["vacation-isle", 16],
  ["tecolote-creek-wetland", 15],
  ["perez-cove", 15],
  ["model-yacht-pond", 15],
  ["enchanted-cove", 15],
]);

function isPaddlePlace(place) {
  return place.paddleRelevant !== false && (place.activities || []).some((activity) => ["SUP", "Kayak", "Canoe"].includes(activity));
}

function placeCategoryLabel(place) {
  if (isPaddlePlace(place)) return "Paddle launch";
  if (place.spaceType === "green") return "Green space";
  if (place.spaceType === "blue") return "Blue space";
  return "Blue + green";
}

function placeTypeLabel(place) {
  return (place.placeTypes || []).map((value) => value.replace(/-/g, " ")).join(", ") || place.waterType || "Outdoor place";
}

function shouldRenderMarker(place) {
  const minimumZoom = markerMinZoom.get(place.id);
  return minimumZoom === undefined || map.getZoom() >= minimumZoom;
}

function applyFilters() {
  const searchTerm = els.search.value.trim().toLowerCase();
  const maxDifficulty = els.difficulty.value === "all" ? Infinity : Number(els.difficulty.value);
  const bounds = map.getBounds();
  const activeCollection = Array.isArray(window.BLUEGREEN_ACTIVE_COLLECTION_IDS)
    ? new Set(window.BLUEGREEN_ACTIVE_COLLECTION_IDS)
    : null;
  const mobileSpaceType = window.BLUEGREEN_MOBILE_SPACE_TYPE || "all";

  state.filteredLaunches = state.allLaunches.filter((place) => {
    const paddlePlace = isPaddlePlace(place);
    const resolvedSpaceType = place.spaceType || (paddlePlace ? "blue" : "mixed");
    const searchText = [
      place.name,
      ...(place.aliases || []),
      place.region,
      place.state,
      place.waterBody,
      place.waterType,
      place.spaceType,
      place.skillLevel,
      place.bestTime,
      place.supSuitability,
      place.windSensitivity,
      place.useLevel,
      place.crowdSensitivity,
      place.stagingSpace,
      place.description,
      ...(place.placeTypes || []),
      ...(place.activityTypes || []),
      ...(place.activities || []),
      ...(place.amenityTypes || []),
      ...(place.amenities || []),
      ...(place.attributeTypes || []),
      ...(place.tags || []),
    ].filter(Boolean).join(" ").toLowerCase();

    const matchesSearch = !searchTerm || searchText.includes(searchTerm);
    const matchesRegion = els.region.value === "all" || place.region === els.region.value;
    const matchesSkill = els.skill.value === "all" || (paddlePlace && place.skillLevel === els.skill.value);
    const matchesActivity = els.activity.value === "all" || (place.activities || []).includes(els.activity.value);
    const matchesDifficulty = els.difficulty.value === "all" || (paddlePlace && Number(place.difficulty) <= maxDifficulty);
    const matchesBounds = !state.showOnlyBounds || bounds.contains([place.lat, place.lng]);
    const matchesCollection = !activeCollection || activeCollection.has(place.id);
    const matchesSpaceType =
      mobileSpaceType === "all" || resolvedSpaceType === mobileSpaceType || resolvedSpaceType === "mixed";

    return matchesSearch && matchesRegion && matchesSkill && matchesActivity && matchesDifficulty && matchesBounds && matchesCollection && matchesSpaceType;
  });

  renderMarkers(state.filteredLaunches);
  renderCards(state.filteredLaunches);
  els.count.textContent = state.filteredLaunches.length;

  const summaryLabel = document.querySelector(".result-summary span");
  if (summaryLabel) summaryLabel.textContent = "places shown";
}

function renderMarkers(places) {
  markerLayer.clearLayers();
  state.markers.clear();

  for (const place of places) {
    if (!shouldRenderMarker(place)) continue;

    const paddlePlace = isPaddlePlace(place);
    const markerClass = paddlePlace || place.spaceType === "blue"
      ? "place-marker place-marker--blue"
      : place.spaceType === "green"
        ? "place-marker place-marker--green"
        : "place-marker place-marker--mixed";
    const markerText = paddlePlace ? String(place.difficulty || "•") : place.spaceType === "green" ? "■" : place.spaceType === "blue" ? "●" : "◆";
    const planningLine = paddlePlace
      ? `SUP ${escapeHtml(place.supSuitability || "Unknown")} &bull; Difficulty ${escapeHtml(place.difficulty)}/5`
      : `${escapeHtml(placeCategoryLabel(place))} &bull; ${escapeHtml(placeTypeLabel(place))}`;

    const marker = L.marker([place.lat, place.lng], {
      icon: L.divIcon({
        className: "",
        html: `<span class="${markerClass}">${markerText}</span>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
        popupAnchor: [0, -18],
      }),
      title: place.name,
    }).bindPopup(`
      <h3 class="popup-title">${escapeHtml(place.name)}</h3>
      <p class="popup-detail">${escapeHtml(place.region)}, ${escapeHtml(place.state)}</p>
      <p class="popup-detail">${planningLine}</p>
      <p class="popup-detail">Activities: ${escapeHtml(formatList(place.activities))}</p>
    `);

    marker.on("click", () => openLaunchDetail(place.id, { focusMap: false }));
    marker.addTo(markerLayer);
    state.markers.set(place.id, marker);
  }
}

function renderCards(places) {
  els.results.innerHTML = "";

  if (!places.length) {
    els.results.innerHTML = '<p class="launch-description">No places match those filters.</p>';
    return;
  }

  for (const place of places) {
    const paddlePlace = isPaddlePlace(place);
    const card = els.template.content.firstElementChild.cloneNode(true);
    const image = card.querySelector(".launch-image");
    const photoBadge = card.querySelector(".photo-badge");
    const title = card.querySelector("h2");
    const pill = card.querySelector(".pill");
    const meta = card.querySelector(".launch-meta");
    const verification = card.querySelector(".verification-line");
    const ratings = card.querySelector(".rating-row");
    const description = card.querySelector(".launch-description");
    const tags = card.querySelector(".tag-row");
    const button = card.querySelector(".card-button");

    const photo = paddlePlace ? getPrimaryPhoto(place) : null;
    if (photo) {
      image.style.backgroundImage = `linear-gradient(135deg, rgba(20,32,35,.18), rgba(15,79,103,.16)), url("${photo.url}")`;
      photoBadge.textContent = photo.status === "location" ? "Place photo" : "Representative image";
    } else {
      photoBadge.hidden = true;
    }

    title.textContent = place.name;
    pill.textContent = placeCategoryLabel(place);
    pill.classList.toggle("pill-green", place.spaceType === "green");
    pill.classList.toggle("pill-mixed", place.spaceType === "mixed" && !paddlePlace);
    meta.textContent = `${place.region}, ${place.state} | ${placeTypeLabel(place)}`;
    verification.textContent = verificationSummary(place);
    description.textContent = place.description;

    ratings.innerHTML = paddlePlace
      ? `
        <div class="rating"><strong>SUP Suitability</strong>${escapeHtml(place.supSuitability || "Unknown")}</div>
        <div class="rating"><strong>Difficulty</strong>${escapeHtml(place.difficulty)}/5</div>
        <div class="rating"><strong>Wind</strong>${escapeHtml(place.windSensitivity || "Unknown")}</div>
      `
      : `
        <div class="rating"><strong>Space</strong>${escapeHtml(placeCategoryLabel(place))}</div>
        <div class="rating"><strong>Typical Use</strong>${escapeHtml(place.useLevel || "Unknown")}</div>
        <div class="rating"><strong>Types</strong>${escapeHtml(placeTypeLabel(place))}</div>
      `;

    [...(place.activities || []).slice(0, 4), ...(place.amenities || []).slice(0, 3)].forEach((tag) => {
      const el = document.createElement("span");
      el.className = "tag";
      el.textContent = tag;
      tags.append(el);
    });

    button.addEventListener("click", () => openLaunchDetail(place.id));
    els.results.append(card);
  }
}

function focusLaunch(id) {
  const place = state.allLaunches.find((item) => item.id === id);
  if (!place) return;

  const targetZoom = markerMinZoom.get(id) || 12;
  refreshMapSize();
  map.setView([place.lat, place.lng], Math.max(map.getZoom(), targetZoom), { animate: true });
  renderMarkers(state.filteredLaunches);

  setTimeout(() => {
    const marker = state.markers.get(id);
    if (marker) marker.openPopup();
  }, 250);
}

function detailMarkup(place) {
  const paddlePlace = isPaddlePlace(place);
  const photo = paddlePlace ? getPrimaryPhoto(place) : null;
  const photoMarkup = photo
    ? `<figure class="detail-photo"><img src="${escapeAttribute(photo.url)}" alt="${escapeAttribute(photo.alt || `${place.name} representative image`)}" loading="lazy" /><figcaption>${photoCreditMarkup(photo)}</figcaption></figure>`
    : "";
  const sourceUrls = Array.isArray(place.sourceUrls)
    ? place.sourceUrls.map((source) => (typeof source === "string" ? { label: source, url: source } : source)).filter((source) => source && source.url)
    : [];
  const sourceItems = sourceUrls.length
    ? sourceUrls.map((source) => `<li><a href="${escapeAttribute(source.url)}" target="_blank" rel="noopener">${escapeHtml(source.label || source.url)}</a></li>`).join("")
    : '<li class="muted-list-item">No official source added yet.</li>';
  const planningGrid = paddlePlace
    ? `
      <div><dt>SUP Suitability</dt><dd>${escapeHtml(place.supSuitability || "Unknown")}</dd></div>
      <div><dt>Difficulty</dt><dd>${escapeHtml(place.difficulty)}/5</dd></div>
      <div><dt>Wind Sensitivity</dt><dd>${escapeHtml(place.windSensitivity || "Unknown")}</dd></div>
      <div><dt>Typical Use</dt><dd>${escapeHtml(place.useLevel || "Unknown")}</dd></div>
      <div><dt>Crowd Sensitivity</dt><dd>${escapeHtml(place.crowdSensitivity || "Unknown")}</dd></div>
      <div><dt>Staging Space</dt><dd>${escapeHtml(place.stagingSpace || "Unknown")}</dd></div>
      <div><dt>Best Time</dt><dd>${escapeHtml(place.bestTime || "Unknown")}</dd></div>
      <div><dt>Assessment Confidence</dt><dd>${escapeHtml(place.assessmentConfidence || "Unknown")}</dd></div>`
    : `
      <div><dt>Space Type</dt><dd>${escapeHtml(placeCategoryLabel(place))}</dd></div>
      <div><dt>Place Types</dt><dd>${escapeHtml(placeTypeLabel(place))}</dd></div>
      <div><dt>Typical Use</dt><dd>${escapeHtml(place.useLevel || "Unknown")}</dd></div>
      <div><dt>Activities</dt><dd>${escapeHtml(formatList(place.activities))}</dd></div>`;

  return `
    <div class="detail-card" role="dialog" aria-modal="false" aria-labelledby="detailTitle">
      <button class="detail-close" type="button" aria-label="Close place details" data-close-detail>&times;</button>
      <div class="detail-kicker">${escapeHtml(place.region)}, ${escapeHtml(place.state)}</div>
      <h2 id="detailTitle">${escapeHtml(place.name)}</h2>
      <p class="detail-subtitle">${escapeHtml(place.waterBody || place.waterType)} | ${escapeHtml(placeCategoryLabel(place))}</p>
      ${photoMarkup}
      <div class="detail-status ${verificationClass(place)}"><strong>${escapeHtml(place.verificationStatus || "Needs verification")}</strong><span>${escapeHtml(lastVerifiedText(place))}</span></div>
      <p>${escapeHtml(place.description)}</p>
      <dl class="detail-grid">${planningGrid}</dl>
      <p class="source-note"><strong>BlueGreen Guide assessment:</strong> Static place information is distinct from live conditions. Suitability fields, where shown, are planning guidance rather than safety guarantees.</p>
      <section class="detail-section"><h3>Activities</h3><p>${escapeHtml(formatList(place.activities))}</p></section>
      <section class="detail-section"><h3>Amenities</h3><p>${escapeHtml(formatList(place.amenities))}</p></section>
      <section class="detail-section"><h3>Planning Notes</h3><p>${escapeHtml(formatList(place.tags))}</p></section>
      <section class="detail-section"><h3>Sources</h3><ul class="source-list">${sourceItems}</ul><p class="source-note">${escapeHtml(place.sourceNotes || "Check official sources before relying on access, rules, amenities, or conditions.")}</p></section>
    </div>`;
}

map.on("zoomend", () => renderMarkers(state.filteredLaunches));

applyFilters();
