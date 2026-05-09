#!/usr/bin/env bash

set -euo pipefail

projection_id="${1:-}"

# Legacy resume PDF generation is intentionally disabled.
# Active resume PDFs are reviewed static artifacts until a replacement
# renderer consumes src/lib/content/resume-documents.ts.

if [[ -n "$projection_id" ]]; then
	case "$projection_id" in
		default|resume-bw|Resume_Default|Nicholas_OBrien_Resume_Default)
			echo "Retired broad/default resume artifacts must not be regenerated: $projection_id" >&2
			exit 1
			;;
		it_support|technical_operations|ai_process)
			echo "Legacy resume PDF generation is retired. Active resume PDFs are reviewed static artifacts until the resume-documents.ts renderer is implemented." >&2
			exit 1
			;;
		*)
			echo "Unsupported resume projection for PDF generation: $projection_id" >&2
			exit 1
			;;
	esac
fi

echo "Legacy resume PDF generation is retired. Do not regenerate resume-bw or default resume artifacts. Active role-specific PDFs remain reviewed static artifacts until the resume-documents.ts renderer is implemented." >&2
exit 1
