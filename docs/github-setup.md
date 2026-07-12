# GitHub Setup Record

> Historical reference: the repository and GitHub Pages site are already configured. These instructions document the original setup rather than current work.

## Repository

- Name: `bluegreen-guide`
- Default branch: `main`
- Visibility: public
- GitHub Pages source: `main` branch, repository root

## Live Sites

- App: `https://jeffthomasiii.github.io/bluegreen-guide/`
- Documentation: `https://jeffthomasiii.github.io/bluegreen-guide/docs/`

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

1. Make a focused change.
2. Update canonical data or documentation as required.
3. Regenerate `data/launch-points.js` after editing `data/launch-points.json`.
4. Run `node scripts/validate-repo.js`.
5. Review the app and documentation locally.
6. Commit and push the change to GitHub.
7. Confirm GitHub Pages renders the updated files.

## Issue Template

Use `.github/ISSUE_TEMPLATE/phase-task.md` for future phase or maintenance issues.

The original starter issues for mobile layout, place details, source fields, image strategy, and Phase 1 documentation were completed during the Phase 1 proof of concept. Current status is maintained in `README.md`, `docs/phase-1-closeout.md`, and `docs/phase-roadmap.md`.
