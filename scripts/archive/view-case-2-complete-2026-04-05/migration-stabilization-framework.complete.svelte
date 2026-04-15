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
				Built and tested a practical process for fixing post-upgrade problems in an enterprise application. The
				work turned real remediation steps into stronger package controls.
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
				<li><strong>Endpoint stability:</strong> Resolved duplicate paths, intermittent launch failures, and workaround drift</li>
				<li><strong>Installer flow:</strong> Removed installation ambiguity with earlier failure detection</li>
				<li><strong>Live testing:</strong> Confirmed the approach on production devices, including uninstall and reboot behavior</li>
				<li><strong>Review support:</strong> Produced clear records for review and audit</li>
			</ul>

			<h2>Who It Helped</h2>
			<ul>
				<li>
					<strong>Technical teams:</strong> Gave them control mapping, smoke tests, integrity checks, and package
					comparisons for safer deployment decisions
				</li>
				<li>
					<strong>Business and compliance:</strong> Gave them clear summaries, confidence levels, and before/after
					outcomes without heavy technical language
				</li>
				<li>
					<strong>Future migrations:</strong> Gave later projects a process that can be reused
				</li>
				<li>
					<strong>Operational value:</strong> Made problems easier to trace, document, and fix
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
				This portfolio description was prepared with AI-assisted drafting support. Repository artifacts and
				technical documents were used to summarize the work while preserving confidentiality.
			</p>
			<div class="doc-actions">
				<a class="doc-cta" href="/#migration-card">Hide and Return to Main Page</a>
			</div>
		</div>
	</section>
</main>
