<script lang="ts" generics="T extends ContentCMSTableRow">
	import type { ContentCMSTableRow } from '$src/routes/admin/content/[type]/+page.server.js';

	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Checkbox
	} from 'flowbite-svelte';
	import { EditSolid, TrashBinSolid } from 'flowbite-svelte-icons';

	export let data: T[];
	export let header: string[];
	export let onEdit: (item: T) => void;
	export let onDelete: (id: string) => Promise<boolean>;

	const onDeleteClick = async (id: string) => {
		const result = await onDelete(id);
		if (result) {
			data = data.filter((i) => i.id !== id);
		}
	};
</script>

<Table tabStyle="pill" hoverable={true}>
	<TableHead>
		<TableHeadCell class="!p-4"><Checkbox /></TableHeadCell>
		{#each header as h}
			<TableHeadCell>{h}</TableHeadCell>
		{/each}
		<TableHeadCell class="!p-4">Acciones</TableHeadCell>
	</TableHead>

	<TableBody tableBodyClass="divide-y">
		{#each data as item}
			<TableBodyRow>
				<TableBodyCell class="!p-4"><Checkbox /></TableBodyCell>
				<TableBodyCell>{item.title}</TableBodyCell>
				{#each Object.values(item.additionalRows) as value}
					<TableBodyCell>{value}</TableBodyCell>
				{/each}
				<TableBodyCell>Acciones</TableBodyCell>
				<TableBodyCell class="!p-4">
					<button on:click={() => onEdit(item)}>
						<EditSolid />
					</button>
					<button on:click={() => onDeleteClick(item.id) } >
						<TrashBinSolid />
					</button>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
