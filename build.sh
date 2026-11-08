#!/bin/zsh
# Build the standalone site into docs/ for GitHub Pages. index.html is kept as the
# Artifact body (no doctype), so the build wraps it in a full document, then adds the
# share pages and preview images (tools/share.mjs).
set -e
cd "${0:A:h}"
for f in stories/*.js; do node --check "$f"; done
rm -rf docs && mkdir -p docs/stories
cp stories/*.js docs/stories/
{ print -r -- '<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"></head><body>'; cat index.html; print -r -- '</body></html>'; } > docs/index.html
touch docs/.nojekyll
node tools/share.mjs
echo built docs/
