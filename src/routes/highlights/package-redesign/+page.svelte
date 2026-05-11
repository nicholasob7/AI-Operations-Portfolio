<script lang="ts">
	import HighlightContentPage from '$lib/components/HighlightContentPage.svelte';
	import { packageRedesignContent } from '$lib/content/highlight-content';
	import { resolveEntrySurface } from '$lib/entry-surfaces';
	import type { DestinationAction } from '$lib/components/DestinationActions.svelte';

	const packageRedesignEntrySurface = resolveEntrySurface('packageRedesign');
	const packageRedesignTitle = "Package Redesign | Nicko O'Brien";
	const packageRedesignDescription =
		'Detailed portfolio entry for the Package Redesign evidence highlight.';

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'auto' });
	};

	const packageRedesignActions = [
		{
			id: 'highlights',
			label: 'Highlights',
			type: 'link',
			href: '/highlights',
			preload: true
		},
		{
			id: 'home',
			label: 'Home',
			type: 'link',
			href: '/',
			preload: true
		},
		{
			id: 'top',
			label: 'Top',
			type: 'button',
			onclick: scrollToTop
		}
	] satisfies DestinationAction[];

</script>

<svelte:head>
	<title>{packageRedesignTitle}</title>
	<meta name="description" content={packageRedesignDescription} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={packageRedesignTitle} />
	<meta property="og:description" content={packageRedesignDescription} />
	<meta property="og:site_name" content="Nicko O'Brien" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={packageRedesignTitle} />
	<meta name="twitter:description" content={packageRedesignDescription} />
</svelte:head>

<HighlightContentPage
	actions={packageRedesignActions}
	detail={packageRedesignContent}
	entrySurface={packageRedesignEntrySurface}
	panelId="package-redesign-actions"
/>
