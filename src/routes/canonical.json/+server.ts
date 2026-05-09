import { buildCanonical } from '$lib/canonical/build-canonical';

export const prerender = true;

export function GET() {
	return new Response(JSON.stringify(buildCanonical(), null, 2), {
		headers: {
			'content-type': 'application/json; charset=utf-8'
		}
	});
}
