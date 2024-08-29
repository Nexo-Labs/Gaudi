<script lang="ts">
	import MainSection from "lib/main-section/MainSection.svelte";
	import User from "$components/user.svelte";
	import type { LayoutServerData } from "./$types.js";

	export let data: LayoutServerData;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<MainSection></MainSection>
	<div class="py-12">
		<div class="mx-auto max-w-3xl px-6 lg:px-8 text-center">
		  <User
			data={{
			  user: data?.session?.user,
			  status: Boolean(data?.session),
			}}
		  />
		</div>
	  </div>

</section>
