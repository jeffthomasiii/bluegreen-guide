# Development Workflow

## Current Build

This is a static front-end prototype with no build step.

Core files:

- `index.html`
- `styles.css`
- `app.js`
- `data/launch-points.json`
- `data/launch-points.js`

## Local Testing

Preferred:

```bash
python3 -m http.server 8080
```

Windows:

```powershell
py -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Data Editing

Edit `data/launch-points.json` first.

If direct-file opening needs to continue working, regenerate `data/launch-points.js` from the JSON data:

```bash
node scripts/build-launch-data-js.js
```

## Git Branching

Use small feature branches:

```bash
git checkout -b feature/place-detail-view
```

Commit focused changes:

```bash
git add .
git commit -m "Add launch detail view"
```

## Suggested Labels

- `phase-1`
- `phase-2`
- `data`
- `design`
- `map`
- `mobile`
- `safety`
- `research`
- `enhancement`
- `bug`
