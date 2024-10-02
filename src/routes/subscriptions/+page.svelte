<script lang="ts">
	import { notNull } from '$src/lib/domain/common/optional_helpers.js';
	import { relativeUrls } from '$src/lib/domain/routing.js';
	import ContentWrapper from '$src/lib/view/common/content_wrapper.svelte';
	import EscotaButton from '$src/lib/view/common/escota_button.svelte';
	import H2 from '$src/lib/view/common/headers/h3.svelte';
	import H4 from '$src/lib/view/common/headers/h4.svelte';
	import type { PageData } from './$types.js';
	import ToggleButtonGroup from '$src/lib/view/common/toggle_button_group.svelte';

	export let data: PageData;
	const options = [
		{ id: 'month', label: 'Pago mensual' },
		{ id: 'year', label: 'Pago anual', discount: '10%' }
	]
	let selected: any = options[1];
</script>

<ContentWrapper
	classname="space-y-6 gap-2 flex flex-col items-center"
	backgroundClassname="bg-white"
>
	<H2>Elige tu plan y accede al legado Escohotado.</H2>
	<H4>Descubre videos, artículos y textos exclusivos.</H4>
	<p class="text-center text-cyan-950 text-base font-normal font-['Montserrat'] leading-normal">
		También puedes elegir la modalidad de pago que mejor se adapte a ti.
	</p>

	<ToggleButtonGroup
		bind:selected
		options={options}
	/>

	{#if data.productsByInterval[selected.id]}
		{#each data.productsByInterval[selected.id] as product}
			<h2 class="text-xl font-bold">{product.name}</h2>

			<div class="flex flex-wrap gap-6">
				{#each product.prices as price}
					{@const subscriptionByPrice = data.currentSubscriptions.find(
						(item) => item.priceId == price.id
					)}

					<div class="bg-white shadow-lg p-4 rounded-md w-full sm:w-auto flex-shrink-0">
						<h3 class="text-lg font-semibold">{price.recurring?.interval}</h3>
						<p class="text-sm">
							Precio: {((price.unitAmount || 0) / 100).toLocaleString('es-ES', {
								style: 'currency',
								currency: 'EUR'
							})}
						</p>

						{#if subscriptionByPrice}
							{#if subscriptionByPrice.canceled?.isCanceled == false}
								<a
									href={relativeUrls.subscriptions.updateSubscription(
										subscriptionByPrice.subscriptionId,
										true
									)}
								>
									<EscotaButton text="Cancelar" />
								</a>
							{:else}
								<a
									href={relativeUrls.subscriptions.updateSubscription(
										subscriptionByPrice.subscriptionId,
										false
									)}
								>
									<EscotaButton text="Resuscribirse" />
								</a>
								{@const canceledDate = notNull(
									subscriptionByPrice.canceled?.cancelAt,
									(cancelAt) => new Date(cancelAt * 1000)
								)}
								{#if canceledDate}
									<p>La suscripción se cancelará el {canceledDate.toLocaleDateString()}</p>
								{/if}
							{/if}
						{:else if data.currentSubscriptions && data.currentSubscriptions.length}
							<a
								href={relativeUrls.subscriptions.portalUpdateSubscription(
									data.currentSubscriptions[0].subscriptionId
								)}
							>
								<EscotaButton text="Cambiar" />
							</a>
						{:else}
							<a href={relativeUrls.subscriptions.checkout(price.id)}>
								<EscotaButton text="Suscribirse" />
							</a>
						{/if}
					</div>
				{/each}
			</div>
		{/each}
	{:else}
		<p>No hay productos disponibles para el intervalo seleccionado.</p>
	{/if}

	{#if data.currentSubscriptions && data.currentSubscriptions.length}
		<a href={relativeUrls.subscriptions.portal}>
			<EscotaButton text="Ir a Stripe" />
		</a>
	{/if}
</ContentWrapper>
