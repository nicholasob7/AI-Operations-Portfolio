<script lang="ts">
	import ProjectDetailPage from '$lib/components/ProjectDetailPage.svelte';
	import { migrationProjectDetail } from '$lib/content/project-details';
	import { resolveEntrySurface } from '$lib/entry-surfaces';
	import type { DestinationAction } from '$lib/components/DestinationActions.svelte';

	const migrationEntrySurface = resolveEntrySurface('migrationProject');
	const migrationTitle = "Package Redesign | Nicko O'Brien";
	const migrationDescription =
		'Detailed portfolio entry for the Package Redesign evidence highlight.';

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'auto' });
	};

	const migrationActions = [
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
	<title>{migrationTitle}</title>
	<meta name="description" content={migrationDescription} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={migrationTitle} />
	<meta property="og:description" content={migrationDescription} />
	<meta property="og:site_name" content="Nicko O'Brien" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={migrationTitle} />
	<meta name="twitter:description" content={migrationDescription} />
</svelte:head>

<ProjectDetailPage
	actions={migrationActions}
	detail={migrationProjectDetail}
	entrySurface={migrationEntrySurface}
	panelId="migration-destination-actions"
/>
