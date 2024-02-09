<script lang="ts">
	export let commands: Record<string, () => string> = {};
</script>

<div>This will be a terminal emulator</div>
My commands are:
<pre>
    {#each Object.keys(commands) as command}
		<p>{command}: {commands[command]()}</p>
	{/each}

</pre>
