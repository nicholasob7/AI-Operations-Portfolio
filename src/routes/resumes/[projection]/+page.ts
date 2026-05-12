import { error } from '@sveltejs/kit';
import {
	activeResumeProjectionDocumentSlugs,
	getResumeProjectionDocumentBySlug
} from '$lib/content/resume-documents';

export const entries = () =>
	activeResumeProjectionDocumentSlugs.map((projection) => ({
		projection
	}));

export function load({ params }) {
	const document = getResumeProjectionDocumentBySlug(params.projection);

	if (!document) {
		throw error(404, 'Resume projection not found.');
	}

	return {
		document
	};
}
