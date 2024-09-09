<script lang="ts">
	import Header from '$lib/view/header/Header.svelte';
	import type { LayoutServerData } from "./$types.js";

	export let data: LayoutServerData;

</script>

<div class="app">
	<Header user={data.user} />
	<main>
		<slot />
	</main>
</div>
