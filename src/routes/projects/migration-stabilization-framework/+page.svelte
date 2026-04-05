<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		window.scrollTo({ top: 0, behavior: 'auto' });
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
	<section class="doc-card">
		<p class="eyebrow">Project Detail</p>
		<h1>Enterprise Application Migration Stabilization Framework</h1>

		<div class="doc-text" aria-label="Migration stabilization project details">
			<h2>Summary</h2>
			<p class="doc-summary">
				Built from the successful remediation work in View Case 1, this project turns validated fix logic into a
				structured framework for controlled deployment. Because packaging beyond the remediation stage was blocked
				by external factors, the current version stands at successful test-device instantiation, with full
				production completion still pending.
			</p>

			<h2>What We Found</h2>
			<ul>
				<li><strong>Failure review:</strong> Looked at endpoint failures from a large version migration</li>
				<li>
					<strong>Main causes:</strong> Found user-context drift, cache conflicts, shortcut issues, installer weak
					points, and validation gaps
				</li>
				<li>
					<strong>Fix mapping:</strong> Matched live remediation steps to new package controls
				</li>
				<li>
					<strong>Change tracking:</strong> Built a clear way to link each package change to a known problem and result
				</li>
			</ul>

			<h2>Results</h2>
			<ul>
				<li><strong>Test-device result:</strong> Resolved duplicate paths, intermittent launch failures, and workaround drift on the validation device</li>
				<li><strong>Installer flow:</strong> Reduced installation ambiguity with earlier failure detection</li>
				<li><strong>Prepared output:</strong> Assembled records for review, change submission, and later audit</li>
				<li><strong>Next step:</strong> Production rollout remains pending</li>
			</ul>

			<h2>Who It Helped</h2>
			<ul>
				<li>
					<strong>Technical teams:</strong> Gave them control mapping, smoke tests, integrity checks, and package
					comparisons for review and safer deployment decisions
				</li>
				<li>
					<strong>Business and compliance:</strong> Gave them clear summaries, confidence statements, and before/after
					framing without heavy technical language
				</li>
				<li>
					<strong>Change process:</strong> Prepared project materials for controlled change review and submission
				</li>
				<li>
					<strong>Future migrations:</strong> Prepared a process that can be reused once rollout is completed
				</li>
			</ul>

			<h2>Why It Worked</h2>
			<ul>
				<li>
					<strong>Clear proof:</strong> Each control stayed linked to installer behavior, remediation results, or
					endpoint state
				</li>
				<li>
					<strong>Clear boundaries:</strong> Confirmed findings were kept separate from assumptions and open questions
				</li>
				<li>
					<strong>Shared access:</strong> One structure worked for technical teams, compliance reviewers, operations,
					and documentation work
				</li>
				<li>
					<strong>Reusable process:</strong> The same approach can be used on future enterprise migrations with
					similar failure patterns
				</li>
			</ul>

			<hr />
			<h2>Attribution Note</h2>
			<p class="doc-note">
				This portfolio description was written with GitHub Copilot in Visual Studio Code. Repository artifacts and
				technical documents were used to summarize the work while preserving confidentiality.
			</p>
			<div class="doc-actions">
				<a class="doc-cta" href="/#migration-card">Hide and Return to Main Page</a>
			</div>
		</div>
	</section>
</main>

<style>
	:global(body) {
		margin: 0;
		font-family: 'Space Grotesk', sans-serif;
		background:
			radial-gradient(circle at 10% 10%, rgba(47, 209, 255, 0.12) 0%, transparent 25%),
			radial-gradient(circle at 75% 12%, rgba(110, 63, 177, 0.24) 0%, transparent 24%),
			radial-gradient(circle at 90% 18%, rgba(30, 141, 106, 0.18) 0%, transparent 24%),
			linear-gradient(170deg, #060912 0%, #0b1326 100%);
		color: #e8eefc;
	}

	.doc-page {
		max-width: 980px;
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
		font-family: 'Source Serif 4', serif;
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
		font-family: 'Space Grotesk', sans-serif;
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
		font-family: 'Space Grotesk', sans-serif;
		font-weight: 700;
	}

	.doc-text p {
		margin: 0.3rem 0 0.86rem;
		max-width: 70ch;
		color: #dbe5f5;
	}

	.doc-text p.doc-summary {
		max-width: none;
	}

	.doc-note {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 0.83rem;
		line-height: 1.55;
		color: #b2c7e6;
	}

	hr {
		border: 0;
		height: 1px;
		background: rgba(190, 215, 242, 0.24);
		margin: 1.1rem 0 0.8rem;
	}

	.doc-actions {
		margin-top: 1rem;
		display: flex;
		justify-content: flex-start;
	}

	.doc-cta {
		text-decoration: none;
		font-family: 'Space Grotesk', sans-serif;
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

	@media (max-width: 720px) {
		.doc-text {
			padding: 0.95rem 0.92rem 1rem;
		}

		.doc-text p {
			max-width: none;
		}
	}
</style>
