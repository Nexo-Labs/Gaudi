<script lang="ts">
	export let href: string = '/';
	export let text: string;
	export let variant: 'primary' | 'secondary' = 'primary';
	export let noBreak: boolean = false;
	export let fitContent: boolean = true;
</script>

<a
	{href}
	class="px-4 py-2.5 rounded-sm justify-center items-center gap-1 flex text-center text-xs font-normal font-montserrat"
	class:bg-generic-bg-dark={variant === 'primary'}
	class:text-white={variant === 'primary'}
	class:border={variant === 'secondary'}
	class:border-generic-bg-dark={variant === 'secondary'}
	class:text-generic-bg-dark={variant === 'secondary'}
	class:whitespace-nowrap={noBreak}
	class:leading-3={!noBreak}
	class:inline-flex={fitContent}
	class:w-full={!fitContent}
>
	{text}
</a>