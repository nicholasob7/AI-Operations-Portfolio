<script lang="ts">
	import DestinationActions, { type DestinationAction } from '$lib/components/DestinationActions.svelte';
	import EvidenceHighlightsList from '$lib/components/highlights/EvidenceHighlightsList.svelte';
	import {
		highlightsPageSummary,
		highlightsPageTitle
	} from '$lib/content/highlights';
	import './+page.css';

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'auto' });
	};

	const highlightsActions = [
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
	<title>{`${highlightsPageTitle} | Nicko O'Brien`}</title>
	<meta name="description" content={highlightsPageSummary} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={`${highlightsPageTitle} | Nicko O'Brien`} />
	<meta property="og:description" content={highlightsPageSummary} />
	<meta property="og:site_name" content="Nicko O'Brien" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={`${highlightsPageTitle} | Nicko O'Brien`} />
	<meta name="twitter:description" content={highlightsPageSummary} />
</svelte:head>

<main class="page">
	<DestinationActions actions={highlightsActions} panelId="highlights-destination-actions" />
	<section class="card highlights-page-section" aria-labelledby="highlights-head">
		<h1 id="highlights-head" tabindex="-1">{highlightsPageTitle}</h1>
		<EvidenceHighlightsList navigationReady={true} />
	</section>
</main>
