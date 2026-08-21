const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "..", "data");
const baseJsonPath = path.join(dataDir, "places.json");
const missionBayJsonPath = path.join(dataDir, "mission-bay-launch-points.json");
const fieldTestJsonPath = path.join(dataDir, "green-space-field-test.json");
const baseOutputPath = path.join(dataDir, "places.js");
const missionBayOutputPath = path.join(dataDir, "mission-bay-launch-points.js");

const baseData = JSON.parse(fs.readFileSync(baseJsonPath, "utf8"));
const missionBayData = JSON.parse(fs.readFileSync(missionBayJsonPath, "utf8"));
const fieldTestData = JSON.parse(fs.readFileSync(fieldTestJsonPath, "utf8"));

fs.writeFileSync(baseOutputPath, `window.LAUNCH_POINTS = ${JSON.stringify(baseData, null, 2)};\n`);
fs.writeFileSync(
  missionBayOutputPath,
  `(() => {\n  const request = new XMLHttpRequest();\n  request.open("GET", "data/mission-bay-launch-points.json", false);\n  request.send(null);\n\n  if (request.status && (request.status < 200 || request.status >= 300)) {\n    throw new Error(\`Mission Bay place data request failed: \${request.status}\`);\n  }\n\n  const missionBayPlaces = JSON.parse(request.responseText);\n  const basePlaces = (Array.isArray(window.LAUNCH_POINTS) ? window.LAUNCH_POINTS : [])\n    .filter((place) => place.id !== "mission-bay");\n\n  window.LAUNCH_POINTS = [\n    ...basePlaces,\n    ...(Array.isArray(missionBayPlaces) ? missionBayPlaces : []),\n  ];\n})();\n`
);

function mergeUnique(basePlaces, addedPlaces) {
  const seen = new Set(basePlaces.map((place) => place.id));
  return [
    ...basePlaces,
    ...addedPlaces.filter((place) => {
      if (seen.has(place.id)) return false;
      seen.add(place.id);
      return true;
    }),
  ];
}

const activeBase = baseData.filter((place) => place.id !== "mission-bay");
const baseIds = new Set(activeBase.map((place) => place.id));
const missionOverlaps = missionBayData.filter((place) => baseIds.has(place.id)).map((place) => place.id);
const withMissionBay = mergeUnique(activeBase, missionBayData);
const withMissionIds = new Set(withMissionBay.map((place) => place.id));
const fieldTestOverlaps = fieldTestData.filter((place) => withMissionIds.has(place.id)).map((place) => place.id);
const runtimePlaces = mergeUnique(withMissionBay, fieldTestData);

console.log(
  `Wrote ${baseData.length} base place records (${activeBase.length} active after replacing legacy mission-bay), configured ${missionBayData.length} Mission Bay pilot places, and ${fieldTestData.length} green/mixed field-test places.`
);
console.log(`Unique active runtime count: ${runtimePlaces.length}.`);
if (missionOverlaps.length) console.log(`Base/Mission Bay overlapping IDs: ${missionOverlaps.join(", ")}.`);
if (fieldTestOverlaps.length) console.log(`Field-test overlapping IDs: ${fieldTestOverlaps.join(", ")}.`);
