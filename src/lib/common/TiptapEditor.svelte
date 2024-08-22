<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Image from '@tiptap/extension-image'
	import Youtube from '@tiptap/extension-youtube'

	import TextAlign from '@tiptap/extension-text-align'
	import Typography from '@tiptap/extension-typography'
	import HorizontalRule from '@tiptap/extension-horizontal-rule'
	import CodeBlock from '@tiptap/extension-code-block'
	import Blockquote from '@tiptap/extension-blockquote'
	import TextStyle from '@tiptap/extension-text-style'
	import FontFamily from '@tiptap/extension-font-family'

	let element: any;
	let editor: Editor;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				Image,
				Youtube,
				TextAlign,
				Typography,
				HorizontalRule,
				CodeBlock,
				Blockquote,
				TextStyle,
				FontFamily
			],
			editorProps: {
				attributes: {
				class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
				},
			},
			content: `
    <h2>
      Hi there,
    </h2>
    <p>
      this is a basic <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
    </p>
    <ul>
      <li>
        That’s a bullet list with one …
      </li>
      <li>
        … or two list items.
      </li>
    </ul>
    <p>
      Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
    </p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
    <p>
      I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
    </p>
    <blockquote>
      Wow, that’s amazing. Good work, boy! 👏
      <br />
      — Mom
    </blockquote>
  `,
			onTransaction: () => {
				editor = editor;
			},
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

{#if editor}
	<button
		on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
		class:active={editor.isActive('heading', { level: 1 })}
	>
		H1
	</button>
	<button
		on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
		class:active={editor.isActive('heading', { level: 2 })}
	>
		H2
	</button>
	<button
		on:click={() => editor.chain().focus().setParagraph().run()}
		class:active={editor.isActive('paragraph')}
	>
		P
	</button>
{/if}

<div bind:this={element} />

<style>
	button.active {
		background: black;
		color: white;
	}
</style>
