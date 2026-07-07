# Development Workflow

## Current App Type

Static HTML/CSS/JavaScript app.

## Core Files

- `index.html`
- `styles.css`
- `app.js`
- `data/launch-points.json`
- `data/launch-points.js`

## Local Run

Open `index.html`, or run:

```bash
python3 -m http.server 8080
```

Windows:

```powershell
py -m http.server 8080
```

## Deployment Target

GitHub Pages from the repo root.

## Development Principles

- Keep Phase 1 simple.
- Make data-driven changes before hard-coded UI changes.
- Keep the app easy to run without a build process.
- Document major decisions in `/docs`.
- Use GitHub issues for phase tasks.
- Add tooling only when the prototype needs it.
