<script lang="ts" generics="T extends ContentCMS">

	import { type ContentCMS } from '$src/lib/domain/cms/content-cms.js';

	import {
	  Table,
	  TableBody,
	  TableBodyCell,
	  TableBodyRow,
	  TableHead,
	  TableHeadCell
	} from 'flowbite-svelte';
  
	interface Column<T> {
		columnName: string;
		getColumnValue: (item: T) => string;
	}
	export let edit: ((item: T) => void) | null = null;
	export let data: T[];
	export let columns: Column<T>[] = []; 
  </script>
  
  <Table tabStyle="pill">
	<TableHead>
	  {#each columns as column}
		<TableHeadCell>{column.columnName}</TableHeadCell>
	  {/each}
	  {#if edit}
		<TableHeadCell>Acciones</TableHeadCell>
	  {/if}
	</TableHead>
	
	<TableBody tableBodyClass="divide-y">
	  {#each data as item}
		<TableBodyRow>
		  {#each columns as column}
			<TableBodyCell>{column.getColumnValue(item)}</TableBodyCell>
		  {/each}
		  {#if edit}
		  <TableBodyCell>
			<a href="/edit" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Edit</a>
		  </TableBodyCell>
		  {/if}
		</TableBodyRow>
	  {/each}
	</TableBody>
  </Table>
  