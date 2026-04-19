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
	"$repo_root/scripts/remediation-bw.html" \
	"$repo_root/static/appprojects/Remediation_Script_Development_Portfolio_bw.pdf"

generate_pdf \
	"$repo_root/scripts/portfolio-description-bw.html" \
	"$repo_root/static/appprojects/Portfolio_Description_bw.pdf"
