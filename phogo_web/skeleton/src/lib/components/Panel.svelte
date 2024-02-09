<script lang="ts">
	export let title: String = 'Panel Title';
</script>

<!-- A panel with a title. content underneath, and a slot for more stuff, like actionable buttons -->

<div
	class="
    container
    flex
    sm:flex-col
    max-w-full
    max-h-full
    rounded-md
"
>
	<div class="text-black">
		<div class="panel-heading">
			<h3 class="panel-title">
				{title}
				<span class="pull-right clickable visible-md visible-sm visible-xs">
					<i class="glyphicon glyphicon-chevron-up glyphicon-smaller"> </i>
				</span>
			</h3>
		</div>
		<div class="panel-body">
			<slot name="content" />
		</div>
		{#if $$slots.bottom}
			<div class="panel-footer">
				<slot name="bottom" />
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.panel {
		@apply bg-white shadow-md;
	}
	.panel-heading {
		@apply bg-primary-500 text-white;
	}
	.panel-body {
		@apply p-4;
	}
	.panel-footer {
		@apply bg-primary-500 text-white p-4;
	}
</style>
