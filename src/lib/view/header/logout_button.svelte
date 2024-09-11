<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import Button from '../common/Button.svelte';
</script>

<Button onClick={() => signOut()} text="Salir" variant="secondary" />
