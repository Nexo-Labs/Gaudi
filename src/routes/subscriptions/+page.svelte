<script lang="ts">
	import { notNull } from '$src/lib/domain/common/optional_helpers.js';
	import { relativeUrls } from '$src/lib/domain/routing.js';
	import ContentWrapper from '$src/lib/view/common/content_wrapper.svelte';
	import EscotaButton from '$src/lib/view/common/escota_button.svelte';
	import type { PageData } from './$types.js';

	export let data: PageData;
</script>


<ContentWrapper classname="space-y-6" backgroundClassname="bg-white">
	<h1>Pricing</h1>

	{#each data.products as product}
		<section>
			<h2 class="text-xl font-bold">{product.name}</h2>

			<div class="flex flex-wrap gap-6">
				{#each product.prices as price}
					{@const subscriptionByPrice = data.currentSubscriptions.find(
						(item) => item.priceId == price.id
					)}

					<div class="bg-white shadow-lg p-4 rounded-md w-full sm:w-auto flex-shrink-0">
						<h3 class="text-lg font-semibold">{price.recurring?.interval}</h3>
						<p class="text-sm">
							Price: {((price.unitAmount || 0) / 100).toLocaleString('es-ES', {
								style: 'currency',
								currency: 'eur'
							})}
						</p>

						{#if subscriptionByPrice}
							{#if subscriptionByPrice.canceled?.isCanceled == false}
								<a href={relativeUrls.subscriptions.updateSubscription(
									subscriptionByPrice.subscriptionId, true)
								}>
									<EscotaButton text="Cancelar"/>
								</a>
							{:else}
								<a href={relativeUrls.subscriptions.updateSubscription(
									subscriptionByPrice.subscriptionId, false)
								}>
									<EscotaButton text="Resuscribirse"/>
								</a>
								{@const canceledDate = notNull(
									subscriptionByPrice.canceled?.cancelAt,
									cancelAt => new Date(cancelAt * 1000)
								)}
								{#if canceledDate}
									<p>La suscripción se cancelará el {canceledDate.toLocaleDateString()}</p>
								{/if}
							{/if}
						{:else if data.currentSubscriptions.length}
							<a href={relativeUrls.subscriptions.portalUpdateSubscription(
								data.currentSubscriptions[0].subscriptionId
							)}>
								<EscotaButton text="Cambiar"/>
							</a>

						{:else}
							<a href={relativeUrls.subscriptions.checkout(price.id)}>
								<EscotaButton text="Suscribirse"/>
							</a>
						{/if}
					</div>
				{/each}
			</div>
		</section>
	{/each}
	{#if data.currentSubscriptions.length}
		<a href={relativeUrls.subscriptions.portal}>
			<EscotaButton text="Ir a Stripe"/>
		</a>
	{/if}
</ContentWrapper>
