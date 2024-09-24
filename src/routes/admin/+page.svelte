<script>
	import ContentWrapper from '$src/lib/view/common/content_wrapper.svelte';
	import TiptapEditor from '$src/lib/view/common/tiptap_editor.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<ContentWrapper classname="w-full h-full" backgroundClassname="bg-generic-main">
	<TiptapEditor />
</ContentWrapper>
