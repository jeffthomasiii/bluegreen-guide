const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const dataDir = path.join(root, "data");
const jsonPath = path.join(dataDir, "launch-points.json");
const missionBayJsonPath = path.join(dataDir, "mission-bay-launch-points.json");
const jsPath = path.join(dataDir, "launch-points.js");
const missionBayJsPath = path.join(dataDir, "mission-bay-launch-points.js");
const profilePath = path.join(dataDir, "launch-profile.js");
const collectionsPath = path.join(dataDir, "collections.js");
const expansionPath = path.join(dataDir, "phase-1-expansion.js");
const sourcesPath = path.join(dataDir, "official-sources.js");
const indexPath = path.join(root, "index.html");
const errors = [];

function check(condition, message) {
  if (!condition) errors.push(message);
}

function runBrowserDataFile(filePath) {
  const code = fs.readFileSync(filePath, "utf8");
  vm.runInThisContext(code, { filename: filePath });
}

function loadCanonicalData() {
  const base = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  const missionBay = JSON.parse(fs.readFileSync(missionBayJsonPath, "utf8"));
  return [...base, ...missionBay];
}

function loadRuntimeData() {
  global.window = {};
  const legacyMode = fs.existsSync(expansionPath) || fs.existsSync(sourcesPath);

  if (legacyMode) {
    runBrowserDataFile(jsPath);
    if (fs.existsSync(expansionPath)) runBrowserDataFile(expansionPath);
    if (fs.existsSync(sourcesPath)) runBrowserDataFile(sourcesPath);
  } else {
    runBrowserDataFile(jsPath);
    runBrowserDataFile(missionBayJsPath);
    if (fs.existsSync(profilePath)) runBrowserDataFile(profilePath);
    if (fs.existsSync(collectionsPath)) runBrowserDataFile(collectionsPath);
  }

  return {
    legacyMode,
    launches: Array.isArray(window.LAUNCH_POINTS) ? window.LAUNCH_POINTS : [],
    collections: Array.isArray(window.BLUEGREEN_COLLECTIONS) ? window.BLUEGREEN_COLLECTIONS : [],
  };
}

function validatePlaces(launches) {
  const requiredStrings = [
    "id",
    "name",
    "region",
    "state",
    "waterType",
    "skillLevel",
    "bestTime",
    "description",
    "verificationStatus",
    "sourceNotes",
    "supSuitability",
    "windSensitivity",
    "useLevel",
    "crowdSensitivity",
    "stagingSpace",
    "assessmentConfidence",
  ];
  const requiredArrays = ["activities", "amenities", "tags", "sourceUrls"];
  const ids = new Set();
  const supSuitabilityValues = new Set(["Excellent", "Good", "Fair", "Challenging"]);
  const sensitivityValues = new Set(["Low", "Moderate", "High"]);
  const useLevelValues = new Set(["Low", "Moderate", "High", "Very High"]);
  const stagingValues = new Set(["Limited", "Moderate", "Generous"]);
  const confidenceValues = new Set(["Low", "Moderate", "High"]);

  check(launches.length === 59, `Expected 59 runtime launch records; found ${launches.length}.`);

  launches.forEach((place, index) => {
    const label = place.id || place.name || `record ${index + 1}`;

    requiredStrings.forEach((field) => {
      check(typeof place[field] === "string" && place[field].trim(), `${label}: ${field} must be a non-empty string.`);
    });

    requiredArrays.forEach((field) => {
      check(Array.isArray(place[field]), `${label}: ${field} must be an array.`);
    });

    check(!ids.has(place.id), `${label}: duplicate place id.`);
    ids.add(place.id);

    check(Number.isFinite(place.lat) && place.lat >= -90 && place.lat <= 90, `${label}: latitude is invalid.`);
    check(Number.isFinite(place.lng) && place.lng >= -180 && place.lng <= 180, `${label}: longitude is invalid.`);
    check(Number.isFinite(place.difficulty) && place.difficulty >= 1 && place.difficulty <= 5, `${label}: difficulty must be 1–5.`);
    check(Number.isFinite(place.popularity) && place.popularity >= 0 && place.popularity <= 5, `${label}: legacy popularity must be 0–5 during migration.`);
    check(supSuitabilityValues.has(place.supSuitability), `${label}: invalid supSuitability.`);
    check(sensitivityValues.has(place.windSensitivity), `${label}: invalid windSensitivity.`);
    check(useLevelValues.has(place.useLevel), `${label}: invalid useLevel.`);
    check(sensitivityValues.has(place.crowdSensitivity), `${label}: invalid crowdSensitivity.`);
    check(stagingValues.has(place.stagingSpace), `${label}: invalid stagingSpace.`);
    check(confidenceValues.has(place.assessmentConfidence), `${label}: invalid assessmentConfidence.`);

    (place.sourceUrls || []).forEach((source, sourceIndex) => {
      check(source && typeof source.label === "string" && source.label.trim(), `${label}: source ${sourceIndex + 1} needs a label.`);
      try {
        const url = new URL(source.url);
        check(url.protocol === "https:", `${label}: source ${sourceIndex + 1} must use HTTPS.`);
      } catch {
        check(false, `${label}: source ${sourceIndex + 1} has an invalid URL.`);
      }
    });
  });

  return ids;
}

function validateCollections(collections, placeIds) {
  const collectionIds = new Set();
  check(collections.length === 5, `Expected 5 curated collections; found ${collections.length}.`);

  collections.forEach((collection, index) => {
    const label = collection.id || collection.name || `collection ${index + 1}`;
    check(typeof collection.id === "string" && collection.id.trim(), `${label}: id is required.`);
    check(typeof collection.name === "string" && collection.name.trim(), `${label}: name is required.`);
    check(typeof collection.description === "string" && collection.description.trim(), `${label}: description is required.`);
    check(Array.isArray(collection.placeIds) && collection.placeIds.length, `${label}: placeIds must be a non-empty array.`);
    check(!collectionIds.has(collection.id), `${label}: duplicate collection id.`);
    collectionIds.add(collection.id);

    const seen = new Set();
    (collection.placeIds || []).forEach((placeId) => {
      check(placeIds.has(placeId), `${label}: unknown place id ${placeId}.`);
      check(!seen.has(placeId), `${label}: duplicate place id ${placeId}.`);
      seen.add(placeId);
    });
  });
}

function validateGeneratedData(legacyMode) {
  const canonical = loadCanonicalData();

  if (legacyMode) return;

  global.window = {};
  runBrowserDataFile(jsPath);
  runBrowserDataFile(missionBayJsPath);
  try {
    assert.deepStrictEqual(window.LAUNCH_POINTS, canonical);
  } catch {
    errors.push("Generated browser launch data is not synchronized with the canonical JSON launch data.");
  }

  const index = fs.readFileSync(indexPath, "utf8");
  check(index.includes('src="data/launch-points.js"'), "index.html must load data/launch-points.js.");
  check(index.includes('src="data/mission-bay-launch-points.js"'), "index.html must load data/mission-bay-launch-points.js.");
  check(index.includes('src="data/launch-profile.js"'), "index.html must load data/launch-profile.js.");
  check(index.includes('src="data/collections.js"'), "index.html must load data/collections.js.");
  check(!index.includes("phase-1-expansion.js"), "index.html still loads the legacy Phase 1 expansion layer.");
  check(!index.includes("official-sources.js"), "index.html still loads the legacy official-source layer.");
}

function walkHtmlFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkHtmlFiles(fullPath));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(fullPath);
  }
  return files;
}

function validateHtmlLinks() {
  const htmlFiles = [indexPath, ...walkHtmlFiles(path.join(root, "docs"))];
  const attributePattern = /\b(?:href|src)="([^"]+)"/g;

  htmlFiles.forEach((htmlPath) => {
    const html = fs.readFileSync(htmlPath, "utf8");
    let match;

    while ((match = attributePattern.exec(html))) {
      const raw = match[1];
      if (!raw || /^(?:https?:|mailto:|tel:|javascript:|data:|#)/i.test(raw)) continue;

      if (htmlPath.startsWith(path.join(root, "docs")) && raw.split(/[?#]/)[0].endsWith(".md")) {
        errors.push(`${path.relative(root, htmlPath)} exposes a raw Markdown link: ${raw}`);
        continue;
      }

      const clean = raw.split(/[?#]/)[0];
      const resolved = clean.startsWith("/")
        ? path.join(root, clean.replace(/^\/+/, ""))
        : path.resolve(path.dirname(htmlPath), clean);
      const target = fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()
        ? path.join(resolved, "index.html")
        : resolved;

      check(fs.existsSync(target), `${path.relative(root, htmlPath)} has a missing local target: ${raw}`);
    }
  });
}

let runtime;
try {
  loadCanonicalData();
  runtime = loadRuntimeData();
} catch (error) {
  errors.push(`Could not load launch data: ${error.message}`);
  runtime = { legacyMode: true, launches: [], collections: [] };
}

const placeIds = validatePlaces(runtime.launches);
validateCollections(runtime.collections, placeIds);
validateGeneratedData(runtime.legacyMode);
validateHtmlLinks();

if (errors.length) {
  console.error(`Validation failed with ${errors.length} problem${errors.length === 1 ? "" : "s"}:`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(
  `Validation passed: ${runtime.launches.length} runtime places, ${runtime.collections.length} collections, launch suitability profile, canonical data, and internal links are valid.`
);
