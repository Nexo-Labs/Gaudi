<script>
	import ContentWrapper from '$src/lib/view/common/content_wrapper.svelte';
	import TiptapEditor from '$src/lib/view/common/tiptap_editor.svelte';
	import { Tabs, TabItem } from 'flowbite-svelte';
	import H3 from '$src/lib/view/common/headers/h3.svelte';

</script>

<svelte:head>
	<title>Administración de contenido</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>


<ContentWrapper>
	<H3>Administración de contenido</H3>

	<Tabs>
		<TabItem open title="Artículos">

		</TabItem>
		<TabItem title="Vídeos">

		</TabItem>
		<TabItem title="Fotos">

		</TabItem>
		<TabItem title="Libros">

		</TabItem>
		<TabItem title="Citas">

		</TabItem>
  	</Tabs> 
</ContentWrapper>
