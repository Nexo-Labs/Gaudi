<script lang="ts">
	import type { VideoContentCMS } from '$src/lib/domain/cms/video-content-cms.js';
	import ContentTable from '$src/lib/view/admin/content/content-table.svelte';
    export let videos: VideoContentCMS[] = [];
    console.error(videos)
</script>

<ContentTable 
    data={videos} 
    columns={[
        { columnName: 'Title', getColumnValue: video => video.localized.es.title },
        { columnName: 'Youtube', getColumnValue: video => video.youtube == null ? 'No' : 'Yes' },
        { columnName: 'Vimeo', getColumnValue: video => video.vimeo == null ? 'No' : 'Yes' },
    ]}
/>
