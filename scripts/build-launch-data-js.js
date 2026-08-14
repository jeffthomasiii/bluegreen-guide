const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "..", "data");
const baseJsonPath = path.join(dataDir, "launch-points.json");
const missionBayJsonPath = path.join(dataDir, "mission-bay-launch-points.json");
const baseOutputPath = path.join(dataDir, "launch-points.js");
const missionBayOutputPath = path.join(dataDir, "mission-bay-launch-points.js");

const baseData = JSON.parse(fs.readFileSync(baseJsonPath, "utf8"));
const missionBayData = JSON.parse(fs.readFileSync(missionBayJsonPath, "utf8"));

fs.writeFileSync(baseOutputPath, `window.LAUNCH_POINTS = ${JSON.stringify(baseData, null, 2)};\n`);
fs.writeFileSync(
  missionBayOutputPath,
  `window.LAUNCH_POINTS = [...(Array.isArray(window.LAUNCH_POINTS) ? window.LAUNCH_POINTS : []), ...${JSON.stringify(missionBayData, null, 2)}];\n`
);

console.log(
  `Wrote ${baseData.length} base launch points and ${missionBayData.length} Mission Bay launch points (${baseData.length + missionBayData.length} total runtime places).`
);
