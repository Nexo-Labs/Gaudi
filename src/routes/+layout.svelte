<script lang="ts">
	import Header from 'lib/header/Header.svelte';
	import type { LayoutServerData } from "./$types.js";

	export let data: LayoutServerData;

</script>

<div class="app">
	<Header session={data.session} />
	<main>
		<slot />
	</main>
</div>
