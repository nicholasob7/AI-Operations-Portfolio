<script lang="ts">
	import HomeInnerPanel from '$lib/components/home/HomeInnerPanel.svelte';
	import { personProfilePublicLinks } from '$lib/content/person-profile';

	type Props = {
		navigationReady: boolean;
	};

	let { navigationReady }: Props = $props();
</script>

<section id="hero-head" class="hero card" tabindex="-1">
	<div class="hero-aurora-stack" aria-hidden="true">
		<div class="hero-aurora-frame hero-aurora-frame-1"></div>
		<div class="hero-aurora-frame hero-aurora-frame-2"></div>
		<div class="hero-aurora-frame hero-aurora-frame-3"></div>
		<div class="hero-aurora-frame hero-aurora-frame-4"></div>
	</div>
	<div class="section-flow">
		<div class="hero-heading">
			<h1>Nicko O'Brien</h1>
			<p class="tagline">IT Professional Profile</p>
		</div>
		<HomeInnerPanel>
			<p>
				Support foundation, technical operations delivery evidence, and AI/process improvement capability from one
				reviewed professional profile.
			</p>
			<ul class="contact-list" aria-label="Public links">
				{#each personProfilePublicLinks as item (item.id)}
					<li>
						<a
							aria-disabled={!navigationReady}
							class:interaction-disabled={!navigationReady}
							class="contact-link"
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
		</HomeInnerPanel>
	</div>
</section>
