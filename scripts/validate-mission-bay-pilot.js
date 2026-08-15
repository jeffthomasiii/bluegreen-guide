const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
const pilot = fs.readFileSync(path.join(root, "mission-bay-place-pilot.js"), "utf8");
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
  "Mission Bay pilot must keep paddle difficulty conditional so non-paddle places remain visible when no paddle filter is active."
);
check(
  pilot.includes("const matchesSkill = els.skill.value === \"all\" || (paddlePlace &&"),
  "Mission Bay pilot must keep paddling skill conditional for non-paddle places."
);
check(
  pilot.includes("matchesCollection"),
  "Mission Bay pilot filtering must preserve curated collection filtering."
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
  console.error(`Mission Bay pilot validation failed with ${errors.length} problem${errors.length === 1 ? "" : "s"}:`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Mission Bay pilot regression checks passed.");
