<script lang="ts">
	import ContentWrapper from '$src/lib/view/common/content_wrapper.svelte';
	import Logo from './signature_logo.svelte';
	import NavItem from './nav_item.svelte';
	import HamburgerMenu from './hamburguer_menu.svelte';
	import LoginButton from './login_button.svelte';
	import UserAccountButton from './user_account_button.svelte';
	import HeaderSubmenu from './header_submenu/header_submenu.svelte';
	import type { UserModel } from '$src/lib/domain/user-model.js';
	import type { Optional } from '$src/lib/domain/common/optional_helpers.js';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { EscotaButton } from 'gaudi';

	let isMenuOpen = false;
	export let user: Optional<UserModel>;

	function toggleMenu(changeTo?: boolean) {
		isMenuOpen = changeTo ?? !isMenuOpen;
	}
</script>

<header>
	<ContentWrapper>
		<nav class="h-20 py-5 bg-white flex justify-between items-center">
			<Logo tabindex={0}/>
			<HamburgerMenu on:toggleMenu={() => toggleMenu()} />
			<div class="hidden lg:flex justify-end items-center lg:gap-4 xl:gap-6 xxl:gap-6 flex-shrink-0">
				<NavItem href="/ad-memoriam" text="Ad Memoriam" tabindex={1} />
				<NavItem href="/biblioteca" text="Biblioteca" tabindex={2} />
				<NavItem href="/articulos" text="Artículos" tabindex={3} />
				<NavItem href="/videos" text="Videos" tabindex={4} />
				<NavItem href="/eventos" text="Eventos" tabindex={5} />
				<div class="h-8 justify-start items-center gap-2.5 inline-flex">
					<a href="https://laemboscadura.com/" tabindex={6}>
						<EscotaButton text="La emboscadura" variant="primary"/>
					</a>
					{#if user}
						<div class="relative inline-block">
							<UserAccountButton
								name={user.name ?? user.email}
								toggleMenu={toggleMenu}
							/>
							{#if isMenuOpen}
								<div 
									class="absolute left-0 z-10"
									transition:slide={{ delay: 100, duration: 800, easing: quintOut, axis: 'y' }}
								>
									<HeaderSubmenu user={user} toggleMenu={toggleMenu}/>
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
