<script lang="ts">
	import Header from '$src/lib/view/header/header.svelte';
	import type { LayoutServerData } from './$types.js';

	export let data: LayoutServerData;
</script>

<div class="app">
	<Header user={data.user} />
	<main>
		<slot />
	</main>
</div>
