<script lang="ts">
	import Header from '$src/lib/view/header/header.svelte';
	import type { LayoutServerData } from './$types.js';
	import "$lib/view/tailwind.css"
	import "gaudi/styles.css"
	export let data: LayoutServerData;
</script>

<div class="app">
	<Header user={data.user} />
	<main>
		<slot />
	</main>
</div>
