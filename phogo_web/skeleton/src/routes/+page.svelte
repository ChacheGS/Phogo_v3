<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<script lang="ts">
	import Panel from '$lib/components/Panel.svelte';
	import Editor from '$lib/components/Editor.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
</script>

<div
	class="
	rounded-xl
	bg-white
	flex
	space-x-4
	"
>
	<Panel title="Panel 1">
		<svelte:fragment slot="content">
			<div>
				<Editor theme="monokai" language="python" code="print('Hello, World!')" />
			</div>
		</svelte:fragment>
		<svelte:fragment slot="bottom">
			<div class="flex justify-center">
				<button
					class="
						btn
						btn-primary
					"
				>
					Primary</button
				>
			</div>
		</svelte:fragment>
	</Panel>

	<Panel title="Panel 2">
		<svelte:fragment slot="content">
			<Terminal
				commands={{
					help: (...args) => 'This is a help message'
				}}
			/>
		</svelte:fragment>
		<svelte:fragment slot="bottom">
			<div class="flex justify-center">
				<button
					class="
						btn
						btn-secondary
					"
				>
					Secondary</button
				>
			</div>
		</svelte:fragment>
	</Panel>
</div>

<style lang="postcss">
	figure {
		/*! purgecss ignore current */
		@apply flex relative flex-col;
		@apply w-64 h-64 md:w-80 md:h-80;
	}
	.img-bg {
		/*! purgecss ignore current */
		@apply w-64 h-64 md:w-80 md:h-80;
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation:
			pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
			glow 5s linear infinite;
	}
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
