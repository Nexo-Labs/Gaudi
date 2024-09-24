<script lang="ts">
	import '../tailwind.css';
	import ContentWrapper from '$src/lib/view/common/content_wrapper.svelte';
	import Logo from './signature_logo.svelte';
	import NavItem from './nav_item.svelte';
	import HamburgerMenu from './hamburguer_menu.svelte';
	import LoginButton from './login_button.svelte';
	import UserAccountButton from './user_account_button.svelte';
	import HeaderSubmenu from './header_submenu.svelte';
	import type { UserModel } from '$src/lib/domain/user-model.js';
	import type { Optional } from '$src/lib/domain/common/optional_helpers.js';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import EscotaButton from '../common/escota_button.svelte';

	let isMenuOpen = false;
	export let user: Optional<UserModel>;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<header>
	<ContentWrapper>
		<nav class="h-20 px-7 py-5 bg-white flex justify-between items-center">
			<Logo />
			<HamburgerMenu on:toggleMenu={toggleMenu} />
			<div class="hidden lg:flex justify-end items-center lg:gap-4 xl:gap-6 xxl:gap-6 flex-shrink-0">
				<NavItem href="/ad-memoriam" text="Ad Memoriam" />
				<NavItem href="/biblioteca" text="Biblioteca" />
				<NavItem href="/articulos" text="Artículos" />
				<NavItem href="/videos" text="Videos" />
				<NavItem href="/eventos" text="Eventos" />
				<div class="h-8 justify-start items-center gap-2.5 inline-flex">
					<a href="https://laemboscadura.com/">
						<EscotaButton text="La emboscadura" variant="primary"/>
					</a>
					{#if user}
						<div class="relative inline-block">
							<UserAccountButton
								name={user.name ?? user.email}
								onClick={toggleMenu}
							/>
							{#if isMenuOpen}
								<div 
									class="absolute left-0 z-10"
									transition:slide={{ delay: 100, duration: 800, easing: quintOut, axis: 'y' }}
								>
									<HeaderSubmenu user={user} />
								</div>
							{/if}
						</div>
					{:else}
						<LoginButton />
					{/if}
				</div>
			</div>
		</nav>
	</ContentWrapper>
</header>
