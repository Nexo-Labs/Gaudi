<script>
	import ContentWrapper from '$src/lib/view/common/content_wrapper.svelte';
	import TiptapEditor from '$src/lib/view/common/tiptap_editor.svelte';
	import { Tabs, TabItem } from 'flowbite-svelte';
	import H3 from '$src/lib/view/common/headers/h3.svelte';
	import ContentTable from '$src/lib/view/admin/content/content-table.svelte';

</script>

<svelte:head>
	<title>Administración de contenido</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>


<ContentWrapper>
	<H3>Administración de contenido</H3>

	<Tabs>
		<TabItem open title="Artículos">
			<ContentTable></ContentTable>
		</TabItem>
		<TabItem title="Vídeos">
			<ContentTable></ContentTable>
		</TabItem>
		<TabItem title="Fotos">
			<ContentTable></ContentTable>
		</TabItem>
		<TabItem title="Libros">
			<ContentTable></ContentTable>
		</TabItem>
		<TabItem title="Citas">
			<ContentTable></ContentTable>
		</TabItem>
  	</Tabs> 
</ContentWrapper>
