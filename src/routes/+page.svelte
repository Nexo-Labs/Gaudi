<script lang="ts">
	import MainSection from "$lib/view/main-section/MainSection.svelte";
	import type { LayoutServerData } from "./$types.js";

	export let data: LayoutServerData;

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<MainSection></MainSection>
	<h1>Products</h1>
	{#if data.session?.subscription && data.session?.subscription.status != 'canceled'}
		<a href="/billing/portal">Billing portal</a>
	{:else}
		<a href="/pricing">Pricing</a>
	{/if}
	
	{#if data.session}
		<a href="/auth/signout">Signout</a>
	{:else}
		<a href="/auth/signin">Signin</a>
	{/if}
  

</section>
