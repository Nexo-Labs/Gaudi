<script lang="ts">
	import '../tailwind.css';
	import Logo from './Logo.svelte';
	import NavButton from '$lib/view/common/NavButton.svelte';
	import NavItem from './NavItem.svelte';
	import HamburgerMenu from './HamburgerMenu.svelte';
	import LoginButton from './login_button.svelte';
	import LogoutButton from './logout_button.svelte';
	import type { UserModel } from '$src/lib/domain/user-model.js';
	import type { Optional } from '$src/lib/domain/common/optional_helpers.js';

	let isMenuOpen = false;
	export let user: Optional<UserModel>;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
		console.log('Menu is now', isMenuOpen ? 'open' : 'closed');
	}
</script>

<header>
	<nav class="h-20 px-7 py-5 bg-generic-bg-light flex justify-between items-center">
		<Logo />
		<HamburgerMenu on:toggleMenu={toggleMenu} />
		<div class="hidden lg:flex justify-end items-center lg:gap-4 xl:gap-6 xxl:gap-6 flex-shrink-0">
			<NavItem href="/ad-memoriam" text="Ad Memoriam" />
			<NavItem href="/biblioteca" text="Biblioteca" />
			<NavItem href="/articulos" text="Artículos" />
			<NavItem href="/videos" text="Videos" />
			<NavItem href="/eventos" text="Eventos" />
			<div class="h-8 justify-start items-center gap-2.5 inline-flex">
				<NavButton href="https://laemboscadura.com/" text="La emboscadura" variant="primary" />
				{#if user}
					<LogoutButton />
				{:else}
					<LoginButton />
				{/if}
			</div>
		</div>
	</nav>
</header>
