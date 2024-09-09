<script lang="ts">
	export let classname: string = '';
	export let backgroundClassname: string = '';
</script>

<div class="w-full h-full {backgroundClassname}">
	<div class="mx-auto max-w-screen-lg {classname}">
		<slot></slot>
	</div>
</div>