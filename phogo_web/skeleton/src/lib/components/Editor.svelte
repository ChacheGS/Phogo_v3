<script lang="ts">
	import { storeHighlightJs } from '@skeletonlabs/skeleton';

	export let theme: string = 'monokai';
	export let language: string = 'javascript';
	export let code: string = "console.log('Hello, World!')";
</script>

<div>This will be a code editor</div>
My props are: {theme}, {language}, {code}
