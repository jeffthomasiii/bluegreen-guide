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

const activeBaseCount = baseData.filter((place) => place.id !== "mission-bay").length;
console.log(
  `Wrote ${baseData.length} base place records and configured ${missionBayData.length} Mission Bay pilot places plus ${fieldTestData.length} green/mixed field-test places (${activeBaseCount + missionBayData.length + fieldTestData.length} active runtime places).`
);
