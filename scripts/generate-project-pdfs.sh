#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"

. "$repo_root/scripts/pdf-render-lib.sh"

readonly chrome_bin="$(resolve_chrome_bin)"

node --experimental-strip-types "$repo_root/scripts/render-pdf-html.mjs" remediation migration

generate_pdf \
	"$chrome_bin" \
	"$repo_root/scripts/generated/remediation-bw.html" \
	"$repo_root/static/appprojects/Remediation_Script_Development_Portfolio_bw.pdf"

generate_pdf \
	"$chrome_bin" \
	"$repo_root/scripts/generated/portfolio-description-bw.html" \
	"$repo_root/static/appprojects/Portfolio_Description_bw.pdf"
