const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "..", "data", "launch-points.json");
const outputPath = path.join(__dirname, "..", "data", "launch-points.js");

const json = fs.readFileSync(dataPath, "utf8");
const data = JSON.parse(json);

fs.writeFileSync(outputPath, `window.LAUNCH_POINTS = ${JSON.stringify(data, null, 2)};\n`);

console.log(`Wrote ${data.length} launch points to data/launch-points.js`);
