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
			class="cta cta-return-top"
			disabled={!entrySettled}
			type="button"
			onclick={returnToTop}
			style:pointer-events={entrySettled ? 'auto' : 'none'}
		>
			Return to Top
		</button>
	</div>
</section>
