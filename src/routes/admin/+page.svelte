<script>
	import ContentWrapper from 'lib/common/ContentWrapper.svelte';
	import TiptapEditor from "lib/common/TiptapEditor.svelte";
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
    <ContentWrapper classname="w-full h-96 relative" backgroundClassname="bg-generic-main">
        <TiptapEditor/>
    </ContentWrapper>
</section>
