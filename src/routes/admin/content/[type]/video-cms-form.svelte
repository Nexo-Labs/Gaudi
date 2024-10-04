<script lang="ts">
	import type { VideoContentCMS } from "$src/lib/domain/cms/video-content-cms.js";
	import H3 from "$src/lib/view/common/headers/h3.svelte";
    export let initialFormData: VideoContentCMS | undefined;
</script>

<H3>{#if initialFormData} Editar {:else} Agregar {/if} Vídeo </H3>