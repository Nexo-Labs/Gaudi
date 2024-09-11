<script>
	import ContentWrapper from '$lib/view/common/ContentWrapper.svelte';
	import TiptapEditor from '$lib/view/common/TiptapEditor.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<ContentWrapper classname="w-full h-full" backgroundClassname="bg-generic-main">
	<TiptapEditor />
</ContentWrapper>
