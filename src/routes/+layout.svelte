<script lang="ts">
	import { page } from '$app/state';
	import { toCanonicalUrl } from '$lib/site';
	import './fonts.css';
	import './layout.css';

	let { children } = $props();
	const canonicalUrl = $derived(toCanonicalUrl(page.url.pathname));
</script>

<svelte:head>
	<link rel="canonical" href={canonicalUrl} />
	<link
		rel="alternate"
		type="application/json"
		title="Canonical machine-readable profile and resume projection index"
		href="/canonical.json"
	/>
	<meta property="og:url" content={canonicalUrl} />
	<meta name="theme-color" content="#060912" />
	<link rel="icon" type="image/svg+xml" sizes="any" href="/favicon-n-purple-green.svg?v=1" />
	<link rel="shortcut icon" href="/favicon-n-purple-green.svg?v=1" />
</svelte:head>

{@render children()}

<style>
	:global(#svelte-announcer) {
		position: absolute;
		left: 0;
		top: 0;
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		width: 1px;
		height: 1px;
		overflow: hidden;
		white-space: nowrap;
	}
</style>
