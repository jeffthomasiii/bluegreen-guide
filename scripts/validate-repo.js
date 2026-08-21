const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const dataDir = path.join(root, "data");
const baseJsonPath = path.join(dataDir, "places.json");
const missionBayJsonPath = path.join(dataDir, "mission-bay-launch-points.json");
const fieldTestJsonPath = path.join(dataDir, "green-space-field-test.json");
const baseJsPath = path.join(dataDir, "places.js");
const missionBayJsPath = path.join(dataDir, "mission-bay-launch-points.js");
const fieldTestJsPath = path.join(dataDir, "green-space-field-test.js");
const profilePath = path.join(dataDir, "launch-profile.js");
const collectionsPath = path.join(dataDir, "collections.js");
const indexPath = path.join(root, "index.html");
const errors = [];

function check(condition, message) {
  if (!condition) errors.push(message);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function runBrowserDataFile(filePath) {
  vm.runInThisContext(fs.readFileSync(filePath, "utf8"), { filename: filePath });
}

function mergeUniquePlaces(basePlaces, addedPlaces) {
  const existingIds = new Set(basePlaces.map((place) => place.id));
  return [
    ...basePlaces,
    ...addedPlaces.filter((place) => !existingIds.has(place.id)),
  ];
}

function overlayPlaces(basePlaces, overlay) {
  const replacements = new Map(overlay.map((place) => [place.id, place]));
  const existingIds = new Set(basePlaces.map((place) => place.id));
  return [
    ...basePlaces.map((place) => replacements.get(place.id) || place),
    ...overlay.filter((place) => !existingIds.has(place.id)),
  ];
}

function loadCanonicalData() {
  const base = readJson(baseJsonPath).filter((place) => place.id !== "mission-bay");
  const withMissionBay = mergeUniquePlaces(base, readJson(missionBayJsonPath));
  return overlayPlaces(withMissionBay, readJson(fieldTestJsonPath));
}

function loadRuntimeData() {
  global.window = {};
  runBrowserDataFile(baseJsPath);

  const basePlaces = (window.LAUNCH_POINTS || []).filter((place) => place.id !== "mission-bay");
  window.LAUNCH_POINTS = mergeUniquePlaces(basePlaces, readJson(missionBayJsonPath));
  window.LAUNCH_POINTS = overlayPlaces(window.LAUNCH_POINTS, readJson(fieldTestJsonPath));

  const rawPlaces = [...window.LAUNCH_POINTS];
  if (fs.existsSync(profilePath)) runBrowserDataFile(profilePath);
  if (fs.existsSync(collectionsPath)) runBrowserDataFile(collectionsPath);
  return {
    rawPlaces,
    places: Array.isArray(window.LAUNCH_POINTS) ? window.LAUNCH_POINTS : [],
    collections: Array.isArray(window.BLUEGREEN_COLLECTIONS) ? window.BLUEGREEN_COLLECTIONS : [],
  };
}

function validatePlaces(places) {
  const ids = new Set();
  const supValues = new Set(["Excellent", "Good", "Fair", "Challenging"]);
  const sensitivityValues = new Set(["Low", "Moderate", "High"]);
  const useValues = new Set(["Low", "Moderate", "High", "Very High"]);
  const stagingValues = new Set(["Limited", "Moderate", "Generous"]);
  const confidenceValues = new Set(["Low", "Moderate", "High"]);
  const spaceValues = new Set(["blue", "green", "mixed"]);

  places.forEach((place, index) => {
    const label = place.id || place.name || `record ${index + 1}`;
    ["id", "name", "region", "state", "waterType", "description", "verificationStatus", "sourceNotes"].forEach((field) => {
      check(typeof place[field] === "string" && place[field].trim(), `${label}: ${field} must be a non-empty string.`);
    });
    ["activities", "amenities", "tags", "sourceUrls"].forEach((field) => {
      check(Array.isArray(place[field]), `${label}: ${field} must be an array.`);
    });

    check(!ids.has(place.id), `${label}: duplicate place id.`);
    ids.add(place.id);
    check(Number.isFinite(place.lat) && place.lat >= -90 && place.lat <= 90, `${label}: latitude is invalid.`);
    check(Number.isFinite(place.lng) && place.lng >= -180 && place.lng <= 180, `${label}: longitude is invalid.`);

    if (place.spaceType !== undefined) check(spaceValues.has(place.spaceType), `${label}: invalid spaceType.`);
    if (place.placeTypes !== undefined) check(Array.isArray(place.placeTypes) && place.placeTypes.length, `${label}: placeTypes must be a non-empty array when supplied.`);
    if (place.activityTypes !== undefined) check(Array.isArray(place.activityTypes), `${label}: activityTypes must be an array when supplied.`);
    if (place.amenityTypes !== undefined) check(Array.isArray(place.amenityTypes), `${label}: amenityTypes must be an array when supplied.`);
    if (place.attributeTypes !== undefined) check(Array.isArray(place.attributeTypes), `${label}: attributeTypes must be an array when supplied.`);

    const paddlePlace = place.paddleRelevant !== false && (place.activities || []).some((activity) => ["SUP", "Kayak", "Canoe"].includes(activity));
    if (paddlePlace) {
      ["skillLevel", "bestTime", "supSuitability", "windSensitivity", "useLevel", "crowdSensitivity", "stagingSpace", "assessmentConfidence"].forEach((field) => {
        check(typeof place[field] === "string" && place[field].trim(), `${label}: ${field} is required for paddle places.`);
      });
      check(Number.isFinite(place.difficulty) && place.difficulty >= 1 && place.difficulty <= 5, `${label}: paddle difficulty must be 1–5.`);
      check(Number.isFinite(place.popularity) && place.popularity >= 0 && place.popularity <= 5, `${label}: legacy popularity must be 0–5 for paddle places.`);
      check(supValues.has(place.supSuitability), `${label}: invalid supSuitability.`);
      check(sensitivityValues.has(place.windSensitivity), `${label}: invalid windSensitivity.`);
      check(sensitivityValues.has(place.crowdSensitivity), `${label}: invalid crowdSensitivity.`);
      check(stagingValues.has(place.stagingSpace), `${label}: invalid stagingSpace.`);
      check(confidenceValues.has(place.assessmentConfidence), `${label}: invalid assessmentConfidence.`);
    } else if (place.useLevel !== undefined) {
      check(useValues.has(place.useLevel), `${label}: invalid useLevel.`);
    }

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
  collections.forEach((collection, index) => {
    const label = collection.id || collection.name || `collection ${index + 1}`;
    check(typeof collection.id === "string" && collection.id.trim(), `${label}: id is required.`);
    check(typeof collection.name === "string" && collection.name.trim(), `${label}: name is required.`);
    check(typeof collection.description === "string" && collection.description.trim(), `${label}: description is required.`);
    check(Array.isArray(collection.placeIds) && collection.placeIds.length, `${label}: placeIds must be a non-empty array.`);
    check(!collectionIds.has(collection.id), `${label}: duplicate collection id.`);
    collectionIds.add(collection.id);
    const seen = new Set();
    for (const placeId of collection.placeIds || []) {
      check(placeIds.has(placeId), `${label}: unknown place id ${placeId}.`);
      check(!seen.has(placeId), `${label}: duplicate place id ${placeId}.`);
      seen.add(placeId);
    }
  });
}

function validateGeneratedData(rawRuntimePlaces) {
  const canonical = loadCanonicalData();
  try {
    assert.deepStrictEqual(rawRuntimePlaces, canonical);
  } catch {
    errors.push("Runtime place data is not synchronized with canonical JSON data layers.");
  }

  const missionLoader = fs.readFileSync(missionBayJsPath, "utf8");
  check(missionLoader.includes('data/mission-bay-launch-points.json'), "Mission Bay browser loader must read the canonical Mission Bay JSON file.");
  check(missionLoader.includes('place.id !== "mission-bay"'), "Mission Bay browser loader must replace the legacy aggregate Mission Bay record.");

  const fieldTestLoader = fs.readFileSync(fieldTestJsPath, "utf8");
  check(fieldTestLoader.includes('data/green-space-field-test.json'), "Green-space field-test loader must read its canonical JSON file.");
  check(fieldTestLoader.includes("replacements.get(place.id) || place"), "Green-space field-test loader must overlay existing records by stable ID.");

  const fieldTestPlaces = readJson(fieldTestJsonPath);
  check(fieldTestPlaces.length === 10, `Green-space field-test dataset must contain 10 pilot records; found ${fieldTestPlaces.length}.`);
  check(fieldTestPlaces.filter((place) => place.spaceType === "mixed").length === 4, "Green-space field-test dataset must contain four mixed records.");
  check(fieldTestPlaces.filter((place) => place.spaceType === "green").length === 6, "Green-space field-test dataset must contain six green records.");
  check(!fieldTestPlaces.some((place) => /keller|greer/i.test(`${place.id} ${place.name}`)), "Keller/Greer Ranch must remain outside the canonical field-test dataset until verified.");

  const baseActive = readJson(baseJsonPath).filter((place) => place.id !== "mission-bay");
  const existingBeforeFieldTest = mergeUniquePlaces(baseActive, readJson(missionBayJsonPath));
  const existingIds = new Set(existingBeforeFieldTest.map((place) => place.id));
  const overlays = fieldTestPlaces.filter((place) => existingIds.has(place.id)).map((place) => place.id);
  check(overlays.length === 1 && overlays[0] === "diamond-valley-lake", `Expected Diamond Valley Lake to be the single field-test overlay; found ${overlays.join(", ") || "none"}.`);

  const diamondValley = rawRuntimePlaces.find((place) => place.id === "diamond-valley-lake");
  check(diamondValley?.spaceType === "mixed", "Diamond Valley Lake must receive the mixed-space field-test overlay at runtime.");

  const index = fs.readFileSync(indexPath, "utf8");
  [
    'src="data/places.js"',
    'src="data/mission-bay-launch-points.js"',
    'src="data/green-space-field-test.js"',
    'src="data/launch-profile.js"',
    'src="data/collections.js"',
    'src="mission-bay-place-pilot.js"',
    'href="mission-bay-place-pilot.css"',
  ].forEach((needle) => check(index.includes(needle), `index.html must include ${needle}.`));
}

function walkHtmlFiles(directory) {
  const files = [];
  if (!fs.existsSync(directory)) return files;
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
      const resolved = clean.startsWith("/") ? path.join(root, clean.replace(/^\/+/, "")) : path.resolve(path.dirname(htmlPath), clean);
      const target = fs.existsSync(resolved) && fs.statSync(resolved).isDirectory() ? path.join(resolved, "index.html") : resolved;
      check(fs.existsSync(target), `${path.relative(root, htmlPath)} has a missing local target: ${raw}`);
    }
  });
}

let runtime = { rawPlaces: [], places: [], collections: [] };
try {
  runtime = loadRuntimeData();
} catch (error) {
  errors.push(`Could not load place data: ${error.message}`);
}

const placeIds = validatePlaces(runtime.places);
validateCollections(runtime.collections, placeIds);
validateGeneratedData(runtime.rawPlaces);
validateHtmlLinks();

if (errors.length) {
  console.error(`Validation failed with ${errors.length} problem${errors.length === 1 ? "" : "s"}:`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Validation passed: ${runtime.places.length} active runtime places, ${runtime.collections.length} collections, Mission Bay pilot data, green/mixed field-test overlays, and internal links are valid.`);
