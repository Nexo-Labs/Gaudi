<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ContentTable from '$src/lib/view/admin/content/content-table.svelte';
	import type { PageData } from './$types.js';
	import { Pagination } from 'flowbite-svelte';
	import { ChevronLeftOutline, ChevronRightOutline } from 'flowbite-svelte-icons';

	export let data: PageData;

	$: activePage = $page.url.searchParams.get('page');
    $: limit = $page.url.searchParams.get('limit') ?? '10';
	type Page = { name: number; active: boolean; href: string };
	let totalPages = Math.ceil(data.totalVideos / 10);
	let pages: Page[] = []
    $: {
        totalPages = Math.ceil(data.totalVideos / (Number(limit)));

        pages = Array.from({ length: totalPages }, (_, i) => {
            const pageNum = i + 1;
            return {
                name: pageNum,
                active: pageNum === Number(activePage),
                href: `?page=${pageNum}&limit=${limit}`
            };
        });
    }
	const changePage = (newPage: number) => {
		const params = new URLSearchParams($page.url.search);
		params.set('page', newPage.toString());
		params.set('limit', limit);
		goto(`?${params.toString()}`, { replaceState: true });
	};

	const previous = () => {
		const prevPage = Number(activePage) > 1 ? Number(activePage) - 1 : 1;
		changePage(prevPage);
	};
	const next = () => {
		const nextPage = Number(activePage) < totalPages ? Number(activePage) + 1 : totalPages;
		changePage(nextPage);
	};
</script>

<ContentTable
	data={data.videos.map((video) => video.data)}
	columns={[
		{ columnName: 'Id', getColumnValue: (video) => video.id },
		{ columnName: 'Title', getColumnValue: (video) => video.localized.default.title },
		{ columnName: 'Youtube', getColumnValue: (video) => (video.youtube == null ? 'No' : 'Yes') },
		{ columnName: 'Vimeo', getColumnValue: (video) => (video.vimeo == null ? 'No' : 'Yes') }
	]}
/>

{#if totalPages > 1}
    <Pagination {pages} on:previous={previous} on:next={next} icon>
        <svelte:fragment slot="prev">
            <span class="sr-only">Previous</span>
            <ChevronLeftOutline class="w-2.5 h-2.5" />
        </svelte:fragment>
        <svelte:fragment slot="next">
            <span class="sr-only">Next</span>
            <ChevronRightOutline class="w-2.5 h-2.5" />
        </svelte:fragment>
    </Pagination>
{/if}
