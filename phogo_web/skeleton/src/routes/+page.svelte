<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<script lang="ts">
	import Panel from '$lib/components/Panel.svelte';
	import Editor from '$lib/components/Editor.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import Button from '$lib/components/Button.svelte';
</script>

<div
	class="
	grid
	grid-cols-2
	grid-flow-col
	space-x-4
	min-w-[60rem]
	mx-4
	overflow-hidden
	"
>
	<div
		class="
		container
		bg-white
	"
	>
		<Panel title="Panel 1">
			<svelte:fragment slot="content">
				<div
					class="
					panel-content
				"
				>
					<Editor theme="monokai" language="python" code="print('Hello, World!')" />
				</div>
			</svelte:fragment>
			<svelte:fragment slot="bottom">
				<button
					class="
						flex
						mx-auto
						mt-6
						text-white
						bg-green-500
						border-0
						py-2
						px-5
						focus:outline-none
						hover:bg-green-600
						rounded
						"
				>
					Button
				</button>
			</svelte:fragment>
		</Panel>
	</div>
	<div
		class="
		container
		bg-white
		"
	>
		<Panel title="Panel 2">
			<svelte:fragment slot="content">
				<div
					class="
				panel-content
				"
				>
					<Terminal
						commands={{
							help: (...args) => 'This is a help message'
						}}
					/>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="bottom">
				<Button variant="outline" color="blue">Blue outlined</Button>
			</svelte:fragment>
		</Panel>
	</div>
</div>

<style lang="postcss">
	* {
		outline: 1px solid red;
	}
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
