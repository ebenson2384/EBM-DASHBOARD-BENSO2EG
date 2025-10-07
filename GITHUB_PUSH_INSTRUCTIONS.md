# How to push this dashboard to GitHub

This file contains step-by-step instructions and a small helper script to publish the current project to a GitHub repository.

Prerequisites
- Git installed and configured with your user.name and user.email
- A GitHub account and an empty repository created (or create one during the steps below)
- SSH keys configured for push access (or use HTTPS remote URL)

Quick automated method (recommended)
1. Make the script executable:

```bash
chmod +x scripts/publish.sh
```

2. Run the script with your remote URL and branch name (default branch `main`):

```bash
./scripts/publish.sh git@github.com:<your-username>/<your-repo>.git main
```

The script will initialize a git repo if necessary, add files, commit, add the remote, and push.

Manual method
1. Initialize and add files:

```bash
git init
git add -A
git commit -m "chore: initial commit - dashboard"
```

2. Add remote and push:

```bash
# SSH
git remote add origin git@github.com:<your-username>/<your-repo>.git
# or HTTPS
# git remote add origin https://github.com/<your-username>/<your-repo>.git

git branch -M main
git push -u origin main
```

Notes
- If your repo already has a remote named `origin`, remove or rename it first.
- If you use GitHub Pages, you can publish the `index.html` from `main` or `gh-pages` depending on settings.
- The `scripts/publish.sh` script is provided to make repetitive pushes easy; inspect it before running.

If you want, I can also:
- Create a minimal `README.md` describing the project and usage
- Add GitHub Actions workflow to auto-deploy to GitHub Pages on push
- Help craft a friendly repository description and topics
