# GitHub Setup Record

> Historical reference: the repository and GitHub Pages site are already configured. This document records the setup and current publishing workflow.

## Repository

- Name: `bluegreen-guide`
- Default branch: `main`
- Visibility: public
- GitHub Pages source: `main` branch, repository root
- Custom domain: `bgg.justathoughtblog.org`

## Live Sites

Use the custom domain as the canonical public address:

- App: `https://bgg.justathoughtblog.org/`
- Documentation: `https://bgg.justathoughtblog.org/docs/`
- Alpha entry: `https://bgg.justathoughtblog.org/alpha/`

The underlying `jeffthomasiii.github.io/bluegreen-guide/` address is hosting infrastructure rather than the preferred tester-facing URL.

## Local Development

From the repository root, start a simple server:

```bash
python3 -m http.server 8080
```

On Windows:

```powershell
py -m http.server 8080
```

Then open `http://localhost:8080`.

## Current Publishing Workflow

1. Make a focused change on a branch.
2. Update canonical data or documentation as required.
3. If canonical place JSON changed, run `node scripts/build-place-data-js.js`.
4. Run `node scripts/validate-repo.js`.
5. Review the affected app and documentation locally.
6. Commit and push the branch.
7. Open a pull request against `main`.
8. Confirm validation passes before merge.
9. After merge, confirm the custom-domain GitHub Pages site renders the updated files.
10. On mobile/PWA changes, verify that the service-worker cache version and deployed assets are synchronized so testers do not remain on a stale app shell.

Canonical place JSON currently consists of:

- `data/places.json`
- `data/mission-bay-launch-points.json`
- `data/green-space-field-test.json`

Generated/browser loaders include:

- `data/places.js`
- `data/mission-bay-launch-points.js`
- `data/green-space-field-test.js`

Do not restore the retired `data/launch-points.json` / `data/launch-points.js` workflow.

## Issue Template

Use `.github/ISSUE_TEMPLATE/phase-task.md` for future phase or maintenance issues.

The original starter issues for mobile layout, place details, source fields, image strategy, and Phase 1 documentation were completed during the proof-of-concept work. Current status is maintained in `README.md`, `docs/phase-roadmap.md`, `docs/development-workflow.md`, and `docs/changelog.md`. Historical release scope remains in `docs/phase-1-closeout.md` and the v1.1.0 release notes.
