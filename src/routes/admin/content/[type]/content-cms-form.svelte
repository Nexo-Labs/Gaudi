<script lang="ts" generics="T extends ContentCMS">
	import type { ContentCMS } from "$src/lib/domain/cms/content-cms.js";
	import { type VideoContentCMS } from "$src/lib/domain/cms/video-content-cms.js";
	import { type ContentCMSType, contentCMSTypes } from "$src/lib/domain/prisma-enum-mapping.js";
    import VideoCMSForm from "./video-cms-form.svelte";
    export let initialFormData: T | undefined = undefined;
    export let type: ContentCMSType = contentCMSTypes.VIDEO;
    let videoFormData: VideoContentCMS | undefined = undefined;
    if (type === contentCMSTypes.VIDEO) {
        videoFormData = initialFormData as VideoContentCMS | undefined;
    }

</script>

{#if type === contentCMSTypes.VIDEO}
    <VideoCMSForm initialFormData={videoFormData} />
{/if}