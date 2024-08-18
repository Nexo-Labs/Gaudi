<script lang="ts">
	export let href: string = '/';
	export let text: string;
	export let variant: 'primary' | 'secondary' = 'primary';
</script>

<a
	{href}
	class="px-4 py-2.5 rounded-sm justify-center items-center gap-1 flex text-center text-xs font-normal font-['Montserrat'] leading-3"
	class:bg-generic-bg-dark={variant === 'primary'}
	class:text-white={variant === 'primary'}
	class:border={variant === 'secondary'}
	class:border-generic-bg-dark={variant === 'secondary'}
	class:text-generic-bg-dark={variant === 'secondary'}
>
	{text}
</a>
