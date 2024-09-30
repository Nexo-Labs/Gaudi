<script lang="ts">
	import ContentWrapper from '$src/lib/view/common/content_wrapper.svelte';
	import { Tabs, TabItem } from 'flowbite-svelte';
	import H3 from '$src/lib/view/common/headers/h3.svelte';
	import VideosTable from './views/videos-table.svelte';
	import type { PageData } from './$types.js';

	export let data: PageData;
</script>

<svelte:head>
	<title>Administración de contenido</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>


<ContentWrapper>
	<H3>Administración de contenido</H3>

	<Tabs tabStyle="underline">
		<TabItem open title="Artículos">
		</TabItem>
		<TabItem title="Vídeos">
			<VideosTable videos={data.videos.map(videoDB => videoDB.data)}/>
		</TabItem>
		<TabItem title="Fotos">
		</TabItem>
		<TabItem title="Libros">
		</TabItem>
		<TabItem title="Citas">
		</TabItem>
  	</Tabs> 
</ContentWrapper>
