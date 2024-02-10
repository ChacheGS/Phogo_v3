<script lang="ts">
	export let title: String = 'Panel Title';
</script>

<!-- A panel with a title. content underneath, and a slot for more stuff, like actionable buttons -->

<div
	class="
    	rounded-md
	"
>
	<section class="text-gray-600 body-font">
		<div class="">
			<div class="flex-col justify-center">
				<div class="flex-grow text-center">
					<h2 class="title-font text-2xl font-medium text-gray-900">
						{title}
					</h2>
				</div>
				<div class="rounded-lg overflow-hidden">
					<slot name="content" />
				</div>
				<div class="flex-grow">
					{#if $$slots.bottom}
						<slot name="bottom" />
					{/if}
				</div>
			</div>
		</div>
	</section>
</div>

<style lang="postcss">
	* {
		outline: 1px solid green;
	}
</style>
