#!/usr/bin/env bash

set -eu

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
chrome_bin="${CHROME_BIN:-google-chrome}"

generate_pdf() {
	local input_html="$1"
	local output_pdf="$2"

	"$chrome_bin" \
		--headless=new \
		--disable-gpu \
		--no-pdf-header-footer \
		"--print-to-pdf=$output_pdf" \
		"file://$input_html"
}

generate_pdf \
	"$repo_root/scripts/resume-bw.html" \
	"$repo_root/static/resume-bw.pdf"

generate_pdf \
	"$repo_root/scripts/resume-color.html" \
	"$repo_root/static/resume-color.pdf"
