#!/usr/bin/env bash
# Publish helper for macOS (zsh-compatible)
# Usage: ./scripts/publish.sh <github-remote-url> [branch]
# Example: ./scripts/publish.sh git@github.com:ethanbenson/ebm-dashboard.git main

set -euo pipefail

REMOTE_URL="$1"
BRANCH="${2:-main}"

if [ -z "$REMOTE_URL" ]; then
  echo "Usage: $0 <github-remote-url> [branch]"
  exit 1
fi

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

# initialize repo if needed
if [ ! -d ".git" ]; then
  git init
  echo "Initialized empty Git repository"
fi

# ensure .gitignore exists
if [ ! -f ".gitignore" ]; then
  cat > .gitignore <<'EOF'
.DS_Store
node_modules/
EOF
  git add .gitignore
fi

# add all files and commit
git add -A
if git rev-parse --verify HEAD >/dev/null 2>&1; then
  git commit -m "chore: update dashboard files" || echo "no changes to commit"
else
  git commit -m "chore: initial commit - dashboard" || true
fi

# add remote and push
if git remote | grep -q origin; then
  git remote remove origin
fi

git remote add origin "$REMOTE_URL"

echo "Pushing to $REMOTE_URL (branch: $BRANCH)..."

git push -u origin "$BRANCH"

echo "Done. Your dashboard is now in the remote repository."
