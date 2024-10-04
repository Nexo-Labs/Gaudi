<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { relativeUrls } from '$src/lib/domain/routing.js';
	import ContentTable from '$src/lib/view/admin/content/content-table.svelte';
	import EscotaButton from '$src/lib/view/common/escota_button.svelte';
	import type { PageData } from './$types.js';
	import { Pagination, Button } from 'flowbite-svelte';
	import { ChevronLeftOutline, ChevronRightOutline } from 'flowbite-svelte-icons';
	export let data: PageData;

	$: activePage = $page.url.searchParams.get('page');
	$: limit = $page.url.searchParams.get('limit') ?? '10';
	type Page = { name: number; active: boolean; href: string };
	let totalPages = Math.ceil(data.totalVideos / 10);
	let pages: Page[] = [];
	$: {
		totalPages = Math.ceil(data.totalVideos / Number(limit));

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
	data={data.items}
	header={data.header}
	onEdit={(item) => goto(relativeUrls.admin.contentEdit(data.type, item.id))}
	onDelete={async (id) => {
		const response = await fetch(relativeUrls.admin.contentRemove(id), { method: 'DELETE' });
		return response.ok;
	}}
/>

<div class="inline-flex gap-4 mt-8">
	{#if totalPages > 1}
		<Pagination {pages} on:previous={previous} on:next={next} icon>
			<svelte:fragment slot="prev">
				<span class="sr-only">Previo</span>
				<ChevronLeftOutline class="w-2.5 h-2.5" />
			</svelte:fragment>
			<svelte:fragment slot="next">
				<span class="sr-only">Siguiente</span>
				<ChevronRightOutline class="w-2.5 h-2.5" />
			</svelte:fragment>
		</Pagination>
	{/if}
	<button on:click={() => goto(`${data.type.toLowerCase()}/create`)}>
		<EscotaButton text="Agregar" />
	</button>
</div>
