<script lang="ts">
  import { signIn } from "@auth/sveltekit/client";
  import { signOut } from "@auth/sveltekit/client";

	import Button from "../common/Button.svelte";
</script>

<Button onClick={() => signIn("keycloak")} text="Entrar" variant="secondary"/> 
