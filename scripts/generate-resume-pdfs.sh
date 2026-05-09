#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
projection_id="${1:-}"

. "$repo_root/scripts/pdf-render-lib.sh"

readonly chrome_bin="$(resolve_chrome_bin)"

mkdir -p "$repo_root/static/resumes"

if [[ -n "$projection_id" ]]; then
	node --experimental-strip-types "$repo_root/scripts/render-pdf-html.mjs" resume "$projection_id"

	html_path=""
	pdf_path=""

	case "$projection_id" in
		default)
			html_path="$repo_root/scripts/generated/resume-default-bw.html"
			pdf_path="$repo_root/static/resumes/Nicholas_OBrien_Resume_Default.pdf"
			;;
		it_support)
			html_path="$repo_root/scripts/generated/resume-it-support-bw.html"
			pdf_path="$repo_root/static/resumes/Nicholas_OBrien_Resume_IT_Support.pdf"
			;;
		technical_operations)
			html_path="$repo_root/scripts/generated/resume-technical-operations-bw.html"
			pdf_path="$repo_root/static/resumes/Nicholas_OBrien_Resume_Technical_Operations.pdf"
			;;
		ai_process)
			html_path="$repo_root/scripts/generated/resume-ai-process-bw.html"
			pdf_path="$repo_root/static/resumes/Nicholas_OBrien_Resume_AI_Process.pdf"
			;;
		*)
			echo "Unsupported resume projection for PDF generation: $projection_id" >&2
			exit 1
			;;
	esac

	generate_pdf \
		"$chrome_bin" \
		"$html_path" \
		"$pdf_path"

	exit 0
fi

node --experimental-strip-types "$repo_root/scripts/render-pdf-html.mjs" resume

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
