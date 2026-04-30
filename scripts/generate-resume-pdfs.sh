#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"

. "$repo_root/scripts/pdf-render-lib.sh"

readonly chrome_bin="$(resolve_chrome_bin)"

node --experimental-strip-types "$repo_root/scripts/render-pdf-html.mjs" resume

generate_pdf \
	"$chrome_bin" \
	"$repo_root/scripts/generated/resume-bw.html" \
	"$repo_root/static/resume-bw.pdf"
