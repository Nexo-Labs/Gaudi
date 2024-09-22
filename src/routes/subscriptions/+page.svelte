<script lang="ts">
	import { notNull } from '$src/lib/domain/common/optional_helpers.js';
	import { relativeUrls } from '$src/lib/domain/routing.js';
	import NavButton from '$src/lib/view/common/NavButton.svelte';
	import type { PageData } from './$types.js';

	export let data: PageData;
</script>

<h1>Pricing</h1>

<div class="space-y-6">
	{#each data.products as product}
		<section>
			<h2 class="text-xl font-bold">{product.name}</h2>

			<!-- Contenedor de precios en una fila -->
			<div class="flex flex-wrap gap-6">
				{#each product.prices as price}
					{@const subscriptionByPrice = data.currentSubscriptions.find(
						(item) => item.priceId == price.id
					)}

					<div class="bg-white shadow-lg p-4 rounded-md w-full sm:w-auto flex-shrink-0">
						<h3 class="text-lg font-semibold">{price.recurring?.interval}</h3>
						<p class="text-sm">
							Price: {((price.unit_amount || 0) / 100).toLocaleString('es-ES', {
								style: 'currency',
								currency: 'eur'
							})}
						</p>

						{#if subscriptionByPrice}
							{#if subscriptionByPrice.canceled?.isCanceled == false}
								<NavButton
									text="Cancelar"
									href={relativeUrls.subscriptions.updateSuscription(
										subscriptionByPrice.subscriptionId,
										true
									)}
								/>
							{:else}
								<NavButton
									text="Resuscribirse"
									href={relativeUrls.subscriptions.updateSuscription(
										subscriptionByPrice.subscriptionId,
										false
									)}
								/>
								{@const canceledDate = notNull(
									subscriptionByPrice.canceled?.cancelAt,
									cancelAt => new Date(cancelAt * 1000)
								)}
								{#if canceledDate}
									<p>La suscripción se cancelará el {canceledDate.toLocaleDateString()}</p>
								{/if}
							{/if}
						{:else if data.currentSubscriptions.length}
							<NavButton
								text="Cambiar"
								href={relativeUrls.subscriptions.portalUpdateSubscription(
									data.currentSubscriptions[0].subscriptionId
								)}
							/>
						{:else}
							<NavButton text="Suscribirse" href={relativeUrls.subscriptions.checkout(price.id)} />
						{/if}
					</div>
				{/each}
			</div>
		</section>
	{/each}
	{#if data.currentSubscriptions.length}
		<NavButton text="Ir a Stripe" href={relativeUrls.subscriptions.portal} />
	{/if}
</div>
