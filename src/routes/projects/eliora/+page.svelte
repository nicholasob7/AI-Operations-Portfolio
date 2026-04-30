<script lang="ts">
	import ProjectDetailPage from '$lib/components/ProjectDetailPage.svelte';
	import { elioraProjectDetail } from '$lib/content/project-details';
	import type { DestinationAction } from '$lib/components/DestinationActions.svelte';

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
	<title>Eliora AI Governance | Nicko O'Brien</title>
	<meta
		name="description"
		content="Compact portfolio page describing Eliora as an AI governance and coordination project."
	/>
</svelte:head>

<ProjectDetailPage actions={elioraActions} detail={elioraProjectDetail} panelId="eliora-destination-actions" />
