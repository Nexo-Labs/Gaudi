<script lang="ts">
	import Header from '@compo/Header.svelte';
	import '../base.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>
</div>
