<script lang="ts">
	import { page } from '$app/state';
	import { toCanonicalUrl } from '$lib/site';
	import './layout.css';

	let { children } = $props();
	const canonicalUrl = $derived(toCanonicalUrl(page.url.pathname));
</script>

	<svelte:head>
		<link rel="canonical" href={canonicalUrl} />
		<meta property="og:url" content={canonicalUrl} />
		<meta name="theme-color" content="#060912" />
		<link rel="icon" type="image/svg+xml" sizes="any" href="/favicon-n-purple-green.svg?v=1" />
		<link rel="shortcut icon" href="/favicon-n-purple-green.svg?v=1" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Spectral:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
{@render children()}
