<script lang="ts">
	import ContentTable from '$src/lib/view/admin/content/content-table.svelte';
	import type { PageData } from './$types.js';
	export let data: PageData;
</script>

<ContentTable 
    data={data.videos.map(video => video.data)} 
    columns={[
        { columnName: 'Title', getColumnValue: video => video.localized.default.title },
        { columnName: 'Youtube', getColumnValue: video => video.youtube == null ? 'No' : 'Yes' },
        { columnName: 'Vimeo', getColumnValue: video => video.vimeo == null ? 'No' : 'Yes' },
    ]}
/>
