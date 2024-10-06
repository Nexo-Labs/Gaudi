<script lang="ts">
    import type { PageData } from '../$types.js';
	import H3 from '$src/lib/view/common/headers/h3.svelte';
    import { fileProxy, superForm } from 'sveltekit-superforms';
	import EscotaButton from '$src/lib/view/common/escota_button.svelte';
	import { Helper, Input, Label, Textarea, Fileupload  } from 'flowbite-svelte';

	export let data: PageData;

    const { form, enhance, errors } = superForm(data.form, { dataType: "json" });
    let youtubeLinkHref: string = $form.youtube?.localized?.default?.href || '';
    let vimeoLinkHref: string = $form.vimeo?.localized?.default?.href || '';

    const file = fileProxy(form, 'localized.default.thumbnail')
</script>

<H3>Agregar Vídeo </H3>

<form method="POST" use:enhance class="mt-6" enctype="multipart/form-data" >
    <div class="mb-6">
        <Label for="title" class="mb-2" color={$errors.localized?.default?.title ? 'red' : undefined}>
            Título
        </Label>
        <Input type="text" id="title" placeholder="Título del vídeo" required bind:value={$form.localized.default.title} />
        {#if $errors.localized?.default?.title}
            <Helper class="mt-2" color="red">
                <span class="font-medium">Error: </span> {$errors.localized.default.title}
            </Helper>
        {/if}
    </div>
  
    <div class="mb-6">
        <Label for="description" class="mb-2" color={$errors.localized?.default?.title ? 'red' : undefined}>
            Descripción
        </Label>
        <Textarea id="description" name="description" bind:value={$form.localized.default.description} />
        {#if $errors.localized?.default?.description}
            <Helper class="mt-2" color="red">
                <span class="font-medium">Error: </span> {$errors.localized.default.description}
            </Helper>
        {/if}
    </div>

    <div class="mb-6">
        <Label for="youtubeLink" class="mb-2">Enlace de YouTube</Label>
        <Input type="url" id="youtubeLink" placeholder="https://www.youtube.com/watch?v=XXXXXXXXX" bind:value={youtubeLinkHref} />
        {#if $errors.youtube?.localized?.default?.href}
            <Helper class="mt-2" color="red">
                <span class="font-medium">Error: </span> {$errors.youtube?.localized?.default?.href}
            </Helper>
        {/if}
    </div>

    <div class="mb-6">
        <Label for="vimeoLink" class="mb-2">Enlace de Vimeo</Label>
        <Input type="url" id="vimeoLink" placeholder="https://vimeo.com/XXXXXX" bind:value={vimeoLinkHref} />
        {#if $errors.youtube?.localized?.default?.href}
            <Helper class="mt-2" color="red">
                <span class="font-medium">Error: </span> {$errors.vimeo?.localized?.default?.href}
            </Helper>
        {/if}
    </div>

    <div class="mb-6">
        <Label for="with_helper" class="pb-2">Upload file</Label>
        <Fileupload id="with_helper" class="mb-2" bind:files={$file} />
        <Helper>PNG o JPG</Helper>
        {#if $errors.localized?.default?.thumbnail}
        <Helper class="mt-2" color="red">
            <span class="font-medium">Error: </span> {$errors.localized?.default?.thumbnail}
        </Helper>
        {/if}
    </div>

    <button type="submit"><EscotaButton text="Guardar vídeo"/></button>
</form>
