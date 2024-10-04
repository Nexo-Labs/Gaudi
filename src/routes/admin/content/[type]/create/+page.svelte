<script lang="ts">
    import type { PageData } from './$types.js';
    import ContentCMSForm from '../content-cms-form.svelte';

	export let data: PageData;
</script>

<ContentCMSForm type={data.type} />