<script lang="ts">
	import MainSection from "lib/main-section/MainSection.svelte";
	import type { LayoutServerData } from "./$types.js";
	import { flatMap } from "$src/domain/common/Optional.js";
	import { mapSessionToUserModel } from "$src/domain/user-model.js";

	export let data: LayoutServerData;

	let userModel = flatMap(data?.session, session => mapSessionToUserModel(session))

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<MainSection></MainSection>
	<div class="py-12">
		<div class="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          
		</div>
	  </div>
</section>
