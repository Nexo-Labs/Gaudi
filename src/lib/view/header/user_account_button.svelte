<script lang="ts">
	import EscotaButton from '../common/escota_button.svelte';

    export let name: string
    export let onClick: () => void
</script>

<button on:click={onClick}>
	<EscotaButton text="Hola, {name}" variant="transparent" classname="focus:outline-none" />
</button>