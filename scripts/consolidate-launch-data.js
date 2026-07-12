const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const dataDir = path.join(root, "data");
const jsonPath = path.join(dataDir, "launch-points.json");
const jsPath = path.join(dataDir, "launch-points.js");
const collectionsPath = path.join(dataDir, "collections.js");
const expansionPath = path.join(dataDir, "phase-1-expansion.js");
const sourcesPath = path.join(dataDir, "official-sources.js");
const indexPath = path.join(root, "index.html");
const triggerPath = path.join(root, ".github", "phase-1-closeout-trigger");

function runBrowserDataFile(filePath) {
  const code = fs.readFileSync(filePath, "utf8");
  vm.runInThisContext(code, { filename: filePath });
}

function loadConsolidatedState() {
  global.window = {};

  if (fs.existsSync(expansionPath) || fs.existsSync(sourcesPath)) {
    runBrowserDataFile(jsPath);
    if (fs.existsSync(expansionPath)) runBrowserDataFile(expansionPath);
    if (fs.existsSync(sourcesPath)) runBrowserDataFile(sourcesPath);
  } else {
    window.LAUNCH_POINTS = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    if (fs.existsSync(collectionsPath)) runBrowserDataFile(collectionsPath);
  }

  const launches = Array.isArray(window.LAUNCH_POINTS) ? window.LAUNCH_POINTS : [];
  const collections = Array.isArray(window.BLUEGREEN_COLLECTIONS) ? window.BLUEGREEN_COLLECTIONS : [];

  if (!launches.length) throw new Error("No launch records were loaded.");
  if (!collections.length) throw new Error("No curated collections were loaded.");

  return { launches, collections };
}

function writeCanonicalData(launches, collections) {
  fs.writeFileSync(jsonPath, `${JSON.stringify(launches, null, 2)}\n`);
  fs.writeFileSync(jsPath, `window.LAUNCH_POINTS = ${JSON.stringify(launches, null, 2)};\n`);
  fs.writeFileSync(
    collectionsPath,
    `window.BLUEGREEN_COLLECTIONS = ${JSON.stringify(collections, null, 2)};\n`
  );
}

function updateAppScripts() {
  let html = fs.readFileSync(indexPath, "utf8");

  html = html
    .split("\n")
    .filter(
      (line) =>
        !line.includes('src="data/phase-1-expansion.js"') &&
        !line.includes('src="data/official-sources.js"')
    )
    .join("\n");

  if (!html.includes('src="data/collections.js"')) {
    html = html.replace(
      '<script src="data/launch-points.js"></script>',
      '<script src="data/launch-points.js"></script>\n    <script src="data/collections.js"></script>'
    );
  }

  fs.writeFileSync(indexPath, html.endsWith("\n") ? html : `${html}\n`);
}

function removeLegacyLayers() {
  [expansionPath, sourcesPath, triggerPath].forEach((filePath) => {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  });
}

const { launches, collections } = loadConsolidatedState();
writeCanonicalData(launches, collections);
updateAppScripts();
removeLegacyLayers();

console.log(`Consolidated ${launches.length} launch records and ${collections.length} collections.`);
