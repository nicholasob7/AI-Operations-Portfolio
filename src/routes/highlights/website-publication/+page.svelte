<script lang="ts">
	import HighlightContentPage from '$lib/components/HighlightContentPage.svelte';
	import { websitePublicationContent } from '$lib/content/highlight-content';
	import { resolveEntrySurface } from '$lib/entry-surfaces';
	import type { DestinationAction } from '$lib/components/DestinationActions.svelte';

	const websitePublicationEntrySurface = resolveEntrySurface('websitePublication');
	const websitePublicationTitle = "Website Publication | Nicko O'Brien";
	const websitePublicationDescription =
		'Evidence highlight for website publication, canonical JSON, public route structure, interaction controls, and static delivery.';

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'auto' });
	};

	const websitePublicationActions = [
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
	<title>{websitePublicationTitle}</title>
	<meta name="description" content={websitePublicationDescription} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={websitePublicationTitle} />
	<meta property="og:description" content={websitePublicationDescription} />
	<meta property="og:site_name" content="Nicko O'Brien" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={websitePublicationTitle} />
	<meta name="twitter:description" content={websitePublicationDescription} />
</svelte:head>

<HighlightContentPage
	actions={websitePublicationActions}
	detail={websitePublicationContent}
	entrySurface={websitePublicationEntrySurface}
	panelId="website-publication-actions"
/>
