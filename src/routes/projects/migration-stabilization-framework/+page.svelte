	<script lang="ts">
	import { resolveEntrySurface } from '$lib/entry-surfaces';
	import { onMount } from 'svelte';

	const migrationEntrySurface = resolveEntrySurface('migrationProject');
	let showScrollActions = $state(false);
	let bottomActions: HTMLDivElement | null = null;
	let docCard: HTMLElement | null = null;

	onMount(() => {
		const bottomActionsVisible = () => {
			if (!bottomActions) return false;

			const rect = bottomActions.getBoundingClientRect();
			return rect.top < window.innerHeight - 24 && rect.bottom > 24;
		};

		const topOfCardScrolledOut = () => {
			if (!docCard) return false;

			const rect = docCard.getBoundingClientRect();
			return rect.top < 24;
		};

		const updateScrollActions = () => {
			const hideForBottomActions = bottomActionsVisible();
			showScrollActions = !hideForBottomActions && topOfCardScrolledOut();
		};

		const handleScroll = () => {
			updateScrollActions();
		};

		if (migrationEntrySurface.mode === 'none') {
			window.scrollTo({ top: 0, behavior: 'auto' });
		}

		updateScrollActions();
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};
	});
</script>

<svelte:head>
	<title>Enterprise Migration Stabilization Framework | Nicko O'Brien</title>
	<meta
		name="description"
		content="Detailed portfolio entry for the Enterprise Application Migration Stabilization Framework project."
	/>
</svelte:head>

<main class="doc-page">
	{#if showScrollActions}
		<div class="doc-scroll-actions">
				<a
					class="doc-cta doc-cta-print"
					href="/appprojects/Portfolio_Description_bw.pdf"
					download="Portfolio_Description_BW.pdf"
				>
					Print
				</a>
				<a class="doc-cta" data-sveltekit-preload-code="hover" href="/">Home</a>
				<a class="doc-cta" data-sveltekit-preload-code="hover" href="/#selected-work-head"
					>Next</a
				>
		</div>
	{/if}

	<section bind:this={docCard} class="doc-card">
		<p class="eyebrow">Project Detail</p>
		<h1>Enterprise Application Migration Stabilization Framework</h1>

		<div class="doc-text" aria-label="Migration stabilization project details">
			<h2>Summary</h2>
			<p class="doc-summary">
				Built from the successful remediation script development work, this project turns validated fix
				logic into a framework for controlled deployment. Active reconstruction of installation packaging
				has reached successful test-device validation, with full production deployment still pending.
			</p>

			<h2>What We Found</h2>
			<ul>
				<li><strong>Failure review:</strong> Examined endpoint failures from a large version migration</li>
				<li>
					<strong>Main causes:</strong> Found user-context drift, cache conflicts, shortcut issues, installer weak
					points, and validation gaps
				</li>
				<li>
					<strong>Fix mapping:</strong> Matched live remediation steps to new package controls
				</li>
				<li>
					<strong>Change tracking:</strong> Built a clear method for linking each package change to a known problem and result
				</li>
			</ul>

			<h2>Results</h2>
			<ul>
				<li><strong>Test-device result:</strong> Resolved duplicate paths, intermittent launch failures, and workaround drift on the validation device</li>
				<li><strong>Installer flow:</strong> Reduced installation ambiguity with earlier failure detection</li>
				<li><strong>Prepared output:</strong> Assembled records for review, change submission, and later audit</li>
				<li><strong>Next step:</strong> Production rollout remains pending</li>
			</ul>

			<h2>How It Helped</h2>
			<ul>
				<li>
					<strong>Technical teams:</strong> Control mapping, smoke tests, integrity checks, and package
					comparisons for review and safer deployment decisions
				</li>
				<li>
					<strong>Business and compliance:</strong> Clear summaries, confidence statements, and before/after
					framing without heavy technical language
				</li>
				<li>
					<strong>Change process:</strong> Prepared project materials for controlled change review and submission
				</li>
				<li>
					<strong>Future migrations:</strong> Prepared a reusable process for rollout completion
				</li>
			</ul>

			<h2>Why It Worked</h2>
			<ul>
				<li>
					<strong>Clear proof:</strong> Each control stayed linked to installer behavior, remediation results, or
					endpoint state
				</li>
				<li>
					<strong>Clear boundaries:</strong> Confirmed findings stayed separate from assumptions and open questions
				</li>
				<li>
					<strong>Shared access:</strong> One structure worked across technical teams, compliance reviewers, operations,
					and documentation.
				</li>
				<li>
					<strong>Reusable process:</strong> The same approach can be used for future enterprise migrations with
					similar failure patterns
				</li>
			</ul>

			<div bind:this={bottomActions} class="doc-actions">
					<a
						class="doc-cta doc-cta-print"
						href="/appprojects/Portfolio_Description_bw.pdf"
						download="Portfolio_Description_BW.pdf"
					>
						Print
					</a>
					<a class="doc-cta" data-sveltekit-preload-code="hover" href="/">Home</a>
					<a
						class="doc-cta"
						data-sveltekit-preload-code="hover"
						href="/#selected-work-head"
						>Next</a
					>
				</div>
		</div>
	</section>
</main>

<style>
	:global(body) {
		margin: 0;
		font-family: "Spectral", "Times New Roman", "Liberation Serif", "DejaVu Serif", serif;
		background:
			radial-gradient(circle at 10% 10%, rgba(47, 209, 255, 0.12) 0%, transparent 25%),
			radial-gradient(circle at 75% 12%, rgba(110, 63, 177, 0.24) 0%, transparent 24%),
			radial-gradient(circle at 90% 18%, rgba(30, 141, 106, 0.18) 0%, transparent 24%),
			linear-gradient(170deg, #060912 0%, #0b1326 100%);
		color: #e8eefc;
	}

	.doc-page {
		max-width: 1320px;
		margin: 0 auto;
		padding: 2rem 1.25rem 3rem;
	}

	.doc-card {
		background:
			linear-gradient(rgba(14, 22, 42, 0.82), rgba(14, 22, 42, 0.82)) padding-box,
			linear-gradient(125deg, rgba(35, 148, 182, 0.54), rgba(110, 63, 177, 0.84), rgba(30, 141, 106, 0.84))
				border-box;
		border: 1px solid transparent;
		border-radius: 1rem;
		padding: 1.2rem;
		box-shadow: 0 14px 40px rgba(4, 8, 20, 0.55);
	}

	.eyebrow {
		margin: 0;
		font-size: 0.76rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		font-weight: 700;
		color: #5ed8ff;
	}

	h1 {
		margin: 0.42rem 0 0;
		font-size: clamp(1.62rem, 3.8vw, 2.18rem);
		line-height: 1.06;
	}

	.doc-text {
		margin-top: 0.8rem;
		padding: 1.05rem 1.08rem 1.15rem;
		border-radius: 0.72rem;
		border: 1px solid rgba(190, 215, 242, 0.32);
		background: rgba(12, 20, 37, 0.65);
		font-family: "Spectral", "Times New Roman", "Liberation Serif", "DejaVu Serif", serif;
		font-size: 1rem;
		line-height: 1.64;
		color: #d4def3;
	}

	.doc-summary {
		margin: 0.32rem 0 0.96rem;
		max-width: none;
		color: #dbe5f5;
		line-height: 1.6;
	}

	.doc-text h2 {
		font-family: "Spectral", "Times New Roman", "Liberation Serif", "DejaVu Serif", serif;
		color: #f1f6ff;
		font-size: 1.15rem;
		line-height: 1.26;
		letter-spacing: 0.015em;
		margin: 1.45rem 0 0.5rem;
		padding-top: 0.9rem;
		border-top: 1px solid rgba(162, 201, 243, 0.18);
	}

	.doc-text h2:first-of-type {
		margin-top: 0;
		padding-top: 0;
		border-top: 0;
	}

	.doc-text ul {
		margin: 0.42rem 0 0.95rem 1.22rem;
		padding: 0;
		list-style-type: disc;
		list-style-position: outside;
	}

	.doc-text li {
		display: list-item;
		margin: 0.36rem 0;
		line-height: 1.6;
		color: #d7e2f4;
	}

	.doc-text li::marker {
		color: #8fdcff;
		font-family: "Spectral", "Times New Roman", "Liberation Serif", "DejaVu Serif", serif;
		font-weight: 700;
	}

	.doc-text p {
		margin: 0.3rem 0 0.86rem;
		max-width: none;
		color: #dbe5f5;
	}

	.doc-text p.doc-summary {
		max-width: none;
	}

	.doc-actions {
		margin-top: 1rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		justify-content: flex-start;
	}

	.doc-cta {
		text-decoration: none;
		font-family: "Spectral", "Times New Roman", "Liberation Serif", "DejaVu Serif", serif;
		padding: 0.45rem 0.75rem;
		border-radius: 999px;
		font-size: 0.9rem;
		font-weight: 600;
		letter-spacing: 0.01em;
		color: #f3f7ff;
		background: linear-gradient(120deg, #3b7b63 0%, #2a5f4d 55%, #1e4538 100%);
		border: 1px solid rgba(193, 217, 255, 0.34);
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.06) inset,
			0 8px 20px rgba(7, 14, 33, 0.35);
	}

	.doc-cta-print {
		background: linear-gradient(120deg, #f5f7fb 0%, #d8dee9 55%, #bcc5d2 100%);
		border-color: rgba(255, 255, 255, 0.4);
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.35) inset,
			0 8px 20px rgba(7, 14, 33, 0.28);
		color: #142033;
	}

	.doc-scroll-actions {
		position: fixed;
		top: 0.85rem;
		right: max(1rem, calc((100vw - 1320px) / 2 + 1rem));
		z-index: 30;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		justify-content: flex-end;
	}

	.doc-scroll-actions .doc-cta {
		min-height: 2.45rem;
		padding: 0.56rem 0.92rem;
		font-size: 0.84rem;
		backdrop-filter: none;
		-webkit-backdrop-filter: none;
		text-shadow:
			0 0 1px rgba(4, 9, 22, 0.96),
			0 1px 2px rgba(4, 9, 22, 0.88);
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.04) inset,
			0 10px 22px rgba(4, 9, 22, 0.2);
		background: transparent;
	}

	.doc-scroll-actions .doc-cta-print {
		background: transparent;
		color: #f3f7ff;
		text-shadow:
			0 0 1px rgba(4, 9, 22, 0.96),
			0 1px 2px rgba(4, 9, 22, 0.88);
	}

	@media (min-width: 960px) {
		.doc-page {
			max-width: 1320px;
		}

		.doc-card {
			padding: 1.7rem;
			border-radius: 1.2rem;
		}

		h1 {
			font-size: clamp(2.2rem, 4.6vw, 2.9rem);
		}

		.doc-text {
			padding: 1.24rem 1.28rem 1.32rem;
			font-size: 1.5rem;
			line-height: 1.58;
		}

		.doc-text h2 {
			font-size: 1.24rem;
		}

		.doc-cta {
			font-size: 0.96rem;
		}
	}

	@media (max-width: 720px) {
		.doc-text {
			padding: 0.95rem 0.92rem 1rem;
		}

		.doc-text p {
			max-width: none;
		}

		.doc-scroll-actions {
			top: 0.55rem;
			right: 0.85rem;
			left: auto;
			gap: 0.35rem;
			padding: 0.35rem;
			justify-content: flex-end;
		}
	}
</style>
