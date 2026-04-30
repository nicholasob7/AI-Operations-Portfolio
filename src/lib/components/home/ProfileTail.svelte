<script lang="ts">
	type Props = {
		entrySettled: boolean;
		returnToTop: () => void;
	};

	let { entrySettled, returnToTop }: Props = $props();
</script>

<section id="tail-head" class="card profile-tail">
	<div class="tail-actions">
		<button
			class:interaction-disabled={!entrySettled}
			class="cta cta-return-top"
			disabled={!entrySettled}
			type="button"
			onclick={returnToTop}
		>
			Return to Top
		</button>
	</div>
</section>
