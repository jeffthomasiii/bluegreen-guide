# GitHub Setup

## Recommended Repo Name

`bluegreen-guide`

## Recommended Description

Blue-space and green-space outdoor map prototype, starting with paddleboarding and kayaking launch points.

## Create the Remote Repo

Using the GitHub website:

1. Create a new repository named `bluegreen-guide`.
2. Do not initialize it with a README, `.gitignore`, or license because this local repo already includes starter files.
3. Copy the remote URL.

Then from this repo folder:

```bash
git remote add origin https://github.com/YOUR-USERNAME/bluegreen-guide.git
git branch -M main
git push -u origin main
```

## GitHub Pages

After pushing:

1. Open repo **Settings**.
2. Open **Pages**.
3. Choose **Deploy from a branch**.
4. Choose `main`.
5. Choose `/root`.
6. Save.

## Suggested Initial Issues

See `.github/ISSUE_TEMPLATE/phase-task.md` for issue formatting.

Good starter issues:

- Replace placeholder launch images with properly licensed imagery
- Add place detail view
- Add safety/access verification fields
- Improve mobile layout
- Add map marker clustering
- Add source URL fields to launch data
