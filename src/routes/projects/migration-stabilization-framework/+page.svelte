<script lang="ts">
	import ProjectDetailPage from '$lib/components/ProjectDetailPage.svelte';
	import { migrationProjectDetail } from '$lib/content/project-details';
	import { resolveEntrySurface } from '$lib/entry-surfaces';
	import { onMount } from 'svelte';
	import type { DestinationAction } from '$lib/components/DestinationActions.svelte';

	const migrationEntrySurface = resolveEntrySurface('migrationProject');

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'auto' });
	};

	const migrationActions = [
		{
			id: 'print',
			label: 'Print',
			type: 'link',
			href: '/appprojects/Portfolio_Description_bw.pdf',
			download: 'Portfolio_Description_BW.pdf'
		},
		{
			id: 'home',
			label: 'Home',
			type: 'link',
			href: '/',
			preload: true
		},
		{
			id: 'next',
			label: 'Next',
			type: 'link',
			href: '/#selected-work-head',
			preload: true
		},
		{
			id: 'top',
			label: 'Top',
			type: 'button',
			onclick: scrollToTop
		}
	] satisfies DestinationAction[];

	onMount(() => {
		if (migrationEntrySurface.mode === 'none') {
			window.scrollTo({ top: 0, behavior: 'auto' });
		}
	});
</script>

<svelte:head>
	<title>Enterprise Migration Stabilization Framework | Nicko O'Brien</title>
	<meta
		name="description"
		content="Detailed portfolio entry for the Enterprise Application Migration Stabilization Framework project."
	/>
</svelte:head>

<ProjectDetailPage
	actions={migrationActions}
	detail={migrationProjectDetail}
	panelId="migration-destination-actions"
/>
