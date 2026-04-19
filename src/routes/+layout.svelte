<script lang="ts">
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" sizes="any" href="/favicon-n.svg?v=2" />
	<link rel="shortcut icon" href="/favicon-n.svg?v=2" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Libre+Baskerville:wght@400;700&family=Source+Serif+4:wght@400;600&family=Space+Grotesk:wght@400;500;700&family=Spectral:wght@500;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
{@render children()}
