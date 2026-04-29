<script module lang="ts">
	export type DestinationAction =
		| {
				id: string;
				label: string;
				type: 'link';
				href: string;
				download?: string;
				preload?: boolean;
		  }
		| {
				id: string;
				label: string;
				type: 'button';
				onclick: () => void;
				disabled?: boolean;
		  };
</script>

<script lang="ts">
	type Props = {
		actions: DestinationAction[];
		label?: string;
		panelId?: string;
	};

	let { actions, label = 'Actions', panelId = 'destination-actions-panel' }: Props = $props();
	let open = $state(false);

	const triggerId = $derived(`${panelId}-trigger`);

	const close = () => {
		open = false;
	};

	const toggle = () => {
		open = !open;
	};

	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			close();
		}
	};

	const runButtonAction = (action: Extract<DestinationAction, { type: 'button' }>) => {
		action.onclick();
		close();
	};
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="destination-actions">
	{#if open}
		<div class="destination-actions-panel" id={panelId} aria-labelledby={triggerId}>
			<ul class="destination-actions-list">
				{#each actions as action (action.id)}
					<li>
						{#if action.type === 'link'}
							<a
								class="destination-action"
								data-sveltekit-preload-code={action.preload ? 'hover' : undefined}
								download={action.download}
								href={action.href}
								onclick={close}
							>
								{action.label}
							</a>
						{:else}
							<button
								class="destination-action"
								disabled={action.disabled}
								type="button"
								onclick={() => runButtonAction(action)}
							>
								{action.label}
							</button>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	<button
		aria-controls={panelId}
		aria-expanded={open}
		class="destination-actions-trigger"
		id={triggerId}
		type="button"
		onclick={toggle}
	>
		{label}
	</button>
</div>

<style>
	.destination-actions {
		--destination-actions-content-max: 1320px;
		position: fixed;
		right: max(
			calc(0.85rem + env(safe-area-inset-right)),
			calc((100vw - var(--destination-actions-content-max)) / 2 + 0.85rem)
		);
		bottom: calc(0.85rem + env(safe-area-inset-bottom));
		z-index: 80;
		display: grid;
		justify-items: end;
		gap: 0.45rem;
		font-family: "Spectral", "Times New Roman", "Liberation Serif", "DejaVu Serif", serif;
	}

	.destination-actions-panel {
		width: max-content;
		max-width: min(18rem, calc(100vw - 1.7rem - env(safe-area-inset-right)));
		max-height: min(24rem, calc(100dvh - 6rem - env(safe-area-inset-bottom)));
		overflow-y: auto;
		padding: 0.45rem;
		border: 1px solid rgba(167, 213, 255, 0.24);
		border-radius: 1rem;
		background: rgba(10, 18, 34, 0.94);
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.05) inset,
			0 18px 38px rgba(4, 9, 22, 0.38);
	}

	.destination-actions-list {
		display: grid;
		gap: 0.35rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.destination-action,
	.destination-actions-trigger {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 2.45rem;
		border: 1px solid rgba(193, 217, 255, 0.34);
		border-radius: 999px;
		font: inherit;
		font-size: 0.88rem;
		font-weight: 700;
		letter-spacing: 0.01em;
		text-decoration: none;
		color: #f3f7ff;
		background: linear-gradient(120deg, #35598f 0%, #3f4f64 55%, #1f584b 100%);
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.05) inset,
			0 10px 22px rgba(4, 9, 22, 0.28);
		cursor: pointer;
	}

	.destination-action {
		width: 100%;
		padding: 0.58rem 0.92rem;
		border-color: transparent;
		white-space: nowrap;
		color: #f3f7ff;
		background:
			linear-gradient(120deg, rgba(13, 24, 43, 0.95), rgba(17, 31, 52, 0.95)) padding-box,
			linear-gradient(
					120deg,
					rgba(47, 209, 255, 0.5) 0%,
					rgba(154, 99, 232, 0.42) 52%,
					rgba(57, 198, 154, 0.46) 100%
				)
				border-box;
		text-shadow: 0 1px 2px rgba(3, 8, 20, 0.66);
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.035) inset,
			0 8px 18px rgba(4, 9, 22, 0.22);
	}

	.destination-actions-trigger {
		position: relative;
		isolation: isolate;
		padding: 0.58rem 0.95rem;
		border-color: transparent;
		color: #f8fbff;
		background:
			linear-gradient(120deg, rgba(12, 22, 42, 0.97), rgba(16, 30, 52, 0.97)) padding-box,
			linear-gradient(120deg, #2fd1ff 0%, #9a63e8 52%, #39c69a 100%) border-box;
		text-shadow: 0 1px 2px rgba(3, 8, 20, 0.72);
	}

	.destination-actions-trigger::before {
		content: '';
		position: absolute;
		inset: -3px;
		z-index: -1;
		border-radius: inherit;
		background: linear-gradient(
			120deg,
			rgba(47, 209, 255, 0.34),
			rgba(154, 99, 232, 0.28),
			rgba(57, 198, 154, 0.3)
		);
		background-size: 180% 180%;
		filter: blur(8px);
		opacity: 0.45;
		pointer-events: none;
		animation: destination-trigger-rim 9s ease-in-out infinite alternate;
	}

	.destination-action:hover,
	.destination-actions-trigger:hover {
		border-color: rgba(206, 226, 255, 0.58);
		background: linear-gradient(120deg, #446ca9 0%, #51657e 55%, #296f5f 100%);
	}

	.destination-action:hover {
		border-color: transparent;
		background:
			linear-gradient(120deg, rgba(17, 31, 54, 0.97), rgba(21, 39, 60, 0.97)) padding-box,
			linear-gradient(
					120deg,
					rgba(97, 221, 255, 0.64) 0%,
					rgba(170, 118, 239, 0.52) 52%,
					rgba(83, 213, 170, 0.58) 100%
				)
				border-box;
	}

	.destination-actions-trigger:hover {
		border-color: transparent;
		background:
			linear-gradient(120deg, rgba(15, 28, 52, 0.98), rgba(20, 38, 62, 0.98)) padding-box,
			linear-gradient(120deg, #61ddff 0%, #aa76ef 52%, #53d5aa 100%) border-box;
	}

	.destination-action:focus-visible,
	.destination-actions-trigger:focus-visible {
		outline: 2px solid rgba(141, 214, 255, 0.92);
		outline-offset: 3px;
	}

	.destination-action:disabled {
		opacity: 0.58;
		cursor: default;
	}

	@keyframes destination-trigger-rim {
		from {
			background-position: 0% 50%;
		}

		to {
			background-position: 100% 50%;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.destination-actions-trigger::before {
			animation: none;
		}
	}

	@media (max-width: 420px) {
		.destination-actions {
			right: calc(0.65rem + env(safe-area-inset-right));
			bottom: calc(0.65rem + env(safe-area-inset-bottom));
		}

		.destination-actions-panel {
			max-width: min(17rem, calc(100vw - 1.3rem - env(safe-area-inset-right)));
		}
	}
</style>
