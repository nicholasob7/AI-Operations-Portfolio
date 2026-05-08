#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"

. "$repo_root/scripts/pdf-render-lib.sh"

readonly chrome_bin="$(resolve_chrome_bin)"

node --experimental-strip-types "$repo_root/scripts/render-pdf-html.mjs" resume

mkdir -p "$repo_root/static/resumes"

generate_pdf \
	"$chrome_bin" \
	"$repo_root/scripts/generated/resume-default-bw.html" \
	"$repo_root/static/resumes/Nicholas_OBrien_Resume_Default.pdf"

generate_pdf \
	"$chrome_bin" \
	"$repo_root/scripts/generated/resume-it-support-bw.html" \
	"$repo_root/static/resumes/Nicholas_OBrien_Resume_IT_Support.pdf"

generate_pdf \
	"$chrome_bin" \
	"$repo_root/scripts/generated/resume-technical-operations-bw.html" \
	"$repo_root/static/resumes/Nicholas_OBrien_Resume_Technical_Operations.pdf"

generate_pdf \
	"$chrome_bin" \
	"$repo_root/scripts/generated/resume-ai-process-bw.html" \
	"$repo_root/static/resumes/Nicholas_OBrien_Resume_AI_Process.pdf"

cp "$repo_root/static/resumes/Nicholas_OBrien_Resume_Default.pdf" "$repo_root/static/resume-bw.pdf"
chmod 0644 "$repo_root/static/resume-bw.pdf"
