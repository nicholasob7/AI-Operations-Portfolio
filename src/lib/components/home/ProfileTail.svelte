<script lang="ts">
	type Props = {
		returnToTop: () => void;
	};

	let { returnToTop }: Props = $props();
</script>

<section id="tail-head" class="card profile-tail">
	<div class="tail-actions">
		<button class="cta cta-return-top" type="button" onclick={returnToTop}>Return to Top</button>
	</div>
</section>
