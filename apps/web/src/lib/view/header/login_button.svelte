<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';

	import EscotaButton from '../common/escota_button.svelte';
</script>

<button on:click={() => signIn('keycloak')}>
	<EscotaButton text="Entrar" variant="secondary" />
</button>