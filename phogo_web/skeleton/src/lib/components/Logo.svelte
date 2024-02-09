<script lang="ts">
	import Tortoise from './Tortoise.svelte';
</script>

<div
	class="
    text-xl uppercase max-h-2 flex flex-row items-center
    "
>
	<!-- Animated Logo -->
	<div
		class="
        container
        w-10 h-10
        "
	>
		<Tortoise />
	</div>
	<!-- Text Logo -->
	<div class="ml-2 flex">
		Phogo
		<div class="ml-1 text-xs text-gray-500 self-end">v3</div>
	</div>
</div>
