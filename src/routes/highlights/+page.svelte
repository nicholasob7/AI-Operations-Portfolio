<script lang="ts">
	import EvidenceHighlightsList from '$lib/components/highlights/EvidenceHighlightsList.svelte';
	import {
		highlightsPageSummary,
		highlightsPageTitle
	} from '$lib/content/highlights';
	import './+page.css';
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
	<section class="card highlights-page-section" aria-labelledby="highlights-head">
		<h1 id="highlights-head" tabindex="-1">{highlightsPageTitle}</h1>
		<p class="highlights-page-note">{highlightsPageSummary}</p>
		<EvidenceHighlightsList navigationReady={true} />
	</section>
</main>
