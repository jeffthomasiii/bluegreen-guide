const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
const pilot = fs.readFileSync(path.join(root, "mission-bay-place-pilot.js"), "utf8");
const css = fs.readFileSync(path.join(root, "mission-bay-place-pilot.css"), "utf8");
const errors = [];

function check(condition, message) {
  if (!condition) errors.push(message);
}

const uiRefreshIndex = index.indexOf('src="ui-refresh.js"');
const pilotIndex = index.indexOf('src="mission-bay-place-pilot.js"');

check(uiRefreshIndex >= 0, "index.html must load ui-refresh.js.");
check(pilotIndex >= 0, "index.html must load mission-bay-place-pilot.js.");
check(
  uiRefreshIndex >= 0 && pilotIndex >= 0 && uiRefreshIndex < pilotIndex,
  "ui-refresh.js must load before mission-bay-place-pilot.js so the generalized place renderer remains authoritative."
);

check(
  pilot.includes("const matchesDifficulty = els.difficulty.value === \"all\" || (paddlePlace &&"),
  "Place renderer must keep paddle difficulty conditional so non-paddle places remain visible when no paddle filter is active."
);
check(
  pilot.includes("const matchesSkill = els.skill.value === \"all\" || (paddlePlace &&"),
  "Place renderer must keep paddling skill conditional for non-paddle places."
);
check(
  pilot.includes("matchesCollection"),
  "Place filtering must preserve curated collection filtering."
);
check(
  pilot.includes('resolvedSpaceType === "mixed"'),
  "Mixed places must remain discoverable through both Water and Land mobile filters."
);
check(
  pilot.includes('"place-marker place-marker--green"') && pilot.includes('"place-marker place-marker--mixed"'),
  "Green and mixed places must use distinct marker classes."
);
check(
  pilot.includes('pill.classList.toggle("pill-green"') && pilot.includes('pill.classList.toggle("pill-mixed"'),
  "Green and mixed place cards must use their wayfinding pill treatments."
);
check(
  pilot.includes("ratings.innerHTML = paddlePlace") && pilot.includes("<strong>Space</strong>"),
  "Non-paddle cards must render general place information instead of paddle suitability fields."
);
check(
  css.includes(".place-marker--green") && css.includes("background: #6f8f63"),
  "Green markers must use the approved green wayfinding color."
);
check(
  css.includes(".place-marker--mixed") && css.includes("outline: 3px solid #6f8f63"),
  "Mixed markers must combine blue and green semantics without inventing a new category color."
);
check(
  pilot.includes('["vacation-isle", 16]') && pilot.includes('["tecolote-creek-wetland", 15]'),
  "Mission Bay pilot must retain zoom-based decluttering for the densest overlapping Mission Bay markers."
);
check(
  pilot.includes('map.on("zoomend", () => renderMarkers(state.filteredLaunches))'),
  "Mission Bay markers must refresh when zoom level changes."
);

if (errors.length) {
  console.error(`Place renderer validation failed with ${errors.length} problem${errors.length === 1 ? "" : "s"}:`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Place renderer, green/mixed cards, filters, and marker regression checks passed.");
