<script lang="ts">
	import NaturalLanguageCard from '$lib/components/home/NaturalLanguageCard.svelte';

	type Props = {
		entrySettled: boolean;
		showPrecision: boolean;
		openPrecision: () => void;
		closePrecision: () => void;
		suppressFloatingClose?: boolean;
		onFloatingCloseChange?: (visible: boolean) => void;
	};

	let {
		entrySettled,
		showPrecision,
		openPrecision,
		closePrecision,
		suppressFloatingClose = false,
		onFloatingCloseChange
	}: Props = $props();
</script>

<NaturalLanguageCard
	{entrySettled}
	{showPrecision}
	{openPrecision}
	{closePrecision}
	{suppressFloatingClose}
	{onFloatingCloseChange}
/>
