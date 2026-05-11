import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = true;

// Legacy alias route retained for backward compatibility.
export const load: PageLoad = () => {
	throw redirect(308, '/highlights/ai-governance');
};
