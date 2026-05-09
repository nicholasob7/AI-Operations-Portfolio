#!/usr/bin/env bash

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

generate_pdf() {
	local browser_bin="$1"
	local input_html="$2"
	local output_pdf="$3"
	local output_dir output_name temp_pdf script_dir fallback_renderer allow_text_fallback

	if [[ ! -f "$input_html" ]]; then
		echo "Input HTML not found: $input_html" >&2
		return 1
	fi

	output_dir="$(dirname "$output_pdf")"
	output_name="$(basename "$output_pdf")"
	script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
	fallback_renderer="$script_dir/render-html-text-pdf.mjs"
	allow_text_fallback="${ALLOW_TEXT_PDF_FALLBACK:-0}"
	mkdir -p "$output_dir"
	temp_pdf="$(mktemp "$output_dir/.${output_name}.tmp.XXXXXX")"

	if ! "$browser_bin" \
		--headless=new \
		--disable-gpu \
		--no-pdf-header-footer \
		"--print-to-pdf=$temp_pdf" \
		"file://$input_html"; then
		if [[ "$allow_text_fallback" == "1" ]]; then
			echo "Chrome PDF rendering failed for $input_html; using opt-in text PDF fallback." >&2
			if ! node --experimental-strip-types "$fallback_renderer" "$input_html" "$temp_pdf"; then
				rm -f "$temp_pdf"
				return 1
			fi
		else
			echo "Chrome PDF rendering failed for $input_html." >&2
			echo "Set ALLOW_TEXT_PDF_FALLBACK=1 to permit plain-text fallback rendering." >&2
			rm -f "$temp_pdf"
			return 1
		fi
	fi

	if [[ ! -s "$temp_pdf" ]]; then
		rm -f "$temp_pdf"
		echo "PDF generation produced no output: $output_pdf" >&2
		return 1
	fi

	chmod 0644 "$temp_pdf"
	mv -f "$temp_pdf" "$output_pdf"
}
