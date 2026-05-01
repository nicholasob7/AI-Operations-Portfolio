<script lang="ts">
	import ProjectDetailPage from '$lib/components/ProjectDetailPage.svelte';
	import { elioraProjectDetail } from '$lib/content/project-details';
	import { resolveEntrySurface } from '$lib/entry-surfaces';
	import type { DestinationAction } from '$lib/components/DestinationActions.svelte';

	const elioraEntrySurface = resolveEntrySurface('elioraProject');
	const elioraTitle = "Eliora AI Governance | Nicko O'Brien";
	const elioraDescription =
		'Compact portfolio page describing Eliora as an AI governance and coordination project.';

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'auto' });
	};

	const elioraActions = [
		{
			id: 'home',
			label: 'Home',
			type: 'link',
			href: '/',
			preload: true
		},
		{
			id: 'back-to-card',
			label: 'Back to Card',
			type: 'link',
			href: '/#eliora-head',
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
	<title>{elioraTitle}</title>
	<meta name="description" content={elioraDescription} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={elioraTitle} />
	<meta property="og:description" content={elioraDescription} />
	<meta property="og:site_name" content="Nicko O'Brien" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={elioraTitle} />
	<meta name="twitter:description" content={elioraDescription} />
</svelte:head>

<ProjectDetailPage
	actions={elioraActions}
	detail={elioraProjectDetail}
	entrySurface={elioraEntrySurface}
	panelId="eliora-destination-actions"
/>
