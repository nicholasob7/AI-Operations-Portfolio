<script lang="ts">
	import { personProfilePublicLinks } from '$lib/content/person-profile';

	type Props = {
		navigationReady: boolean;
	};

	let { navigationReady }: Props = $props();
</script>

<section id="hero-head" class="identity-section" tabindex="-1">
	<div class="identity-aurora-stack" aria-hidden="true">
		<div class="identity-aurora-frame identity-aurora-frame-1"></div>
		<div class="identity-aurora-frame identity-aurora-frame-2"></div>
		<div class="identity-aurora-frame identity-aurora-frame-3"></div>
		<div class="identity-aurora-frame identity-aurora-frame-4"></div>
	</div>
	<div class="section-flow">
		<div class="identity-heading">
			<h1>Nicko O'Brien</h1>
		</div>
		<ul class="identity-links" aria-label="Public links">
			{#each personProfilePublicLinks as item (item.id)}
				<li>
					<a
						aria-disabled={!navigationReady}
						class:interaction-disabled={!navigationReady}
						class="identity-link"
						href={item.href}
						rel={item.id === 'email' ? undefined : 'noopener noreferrer'}
						target={item.id === 'email' ? undefined : '_blank'}
						tabindex={navigationReady ? undefined : -1}
					>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>
