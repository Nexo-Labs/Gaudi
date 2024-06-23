<script lang="ts">
	import Header from '@lib/Header.svelte';
	import '@lib/base.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>
</div>
