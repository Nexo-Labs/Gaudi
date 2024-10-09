<script lang="ts">
	import EscotaButton from '../common/escota_button.svelte';

    export let name: string
    export let toggleMenu: (changeTo?: boolean) => void
</script>

<button 
    on:mouseenter={() => toggleMenu(true)}
    on:focusin={() => toggleMenu(true)}
>
	<EscotaButton text="Hola, {name}" variant="transparent" classname="focus:outline-none" />
</button>