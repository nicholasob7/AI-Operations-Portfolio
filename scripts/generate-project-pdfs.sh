#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"

resolve_chrome_bin() {
	if [[ -n "${CHROME_BIN:-}" ]]; then
		if [[ "$CHROME_BIN" != /* || ! -x "$CHROME_BIN" ]]; then
			echo "CHROME_BIN must be an absolute path to an executable browser binary." >&2
			exit 1
		fi

		printf '%s\n' "$CHROME_BIN"
		return
	fi

	if [[ -x /usr/bin/google-chrome ]]; then
		printf '%s\n' /usr/bin/google-chrome
		return
	fi

	local detected_bin
	detected_bin="$(command -v google-chrome || true)"

	if [[ -z "$detected_bin" ]]; then
		echo "google-chrome was not found. Set CHROME_BIN to an absolute executable path." >&2
		exit 1
	fi

	printf '%s\n' "$detected_bin"
}

readonly chrome_bin="$(resolve_chrome_bin)"

node --experimental-strip-types "$repo_root/scripts/render-pdf-html.mjs" migration

generate_pdf() {
	local input_html="$1"
	local output_pdf="$2"
	local output_dir output_name temp_pdf

	if [[ ! -f "$input_html" ]]; then
		echo "Input HTML not found: $input_html" >&2
		return 1
	fi

	output_dir="$(dirname "$output_pdf")"
	output_name="$(basename "$output_pdf")"
	mkdir -p "$output_dir"
	temp_pdf="$(mktemp "$output_dir/.${output_name}.tmp.XXXXXX")"

	if ! "$chrome_bin" \
		--headless=new \
		--disable-gpu \
		--no-pdf-header-footer \
		"--print-to-pdf=$temp_pdf" \
		"file://$input_html"; then
		rm -f "$temp_pdf"
		return 1
	fi

	if [[ ! -s "$temp_pdf" ]]; then
		rm -f "$temp_pdf"
		echo "PDF generation produced no output: $output_pdf" >&2
		return 1
	fi

	mv -f "$temp_pdf" "$output_pdf"
}

generate_pdf \
	"$repo_root/scripts/remediation-bw.html" \
	"$repo_root/static/appprojects/Remediation_Script_Development_Portfolio_bw.pdf"

generate_pdf \
	"$repo_root/scripts/generated/portfolio-description-bw.html" \
	"$repo_root/static/appprojects/Portfolio_Description_bw.pdf"
