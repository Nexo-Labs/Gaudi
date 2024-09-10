<script lang="ts">
	import { relativeUrls } from "$src/lib/domain/routing.js";
	import NavButton from "$src/lib/view/common/NavButton.svelte";
	import type { PageData } from "./$types.js";

	
	export let data: PageData;
</script>

<h1>Pricing</h1>

{#each data.products as product}
	{#each product.prices as price }
		<section>
			<h2>{product.name}</h2>
			<h2>{price.recurring?.interval}</h2>
			<p>
				Price: {((price.unit_amount || 0) / 100).toLocaleString(
					'es-ES', 
					{ style: 'currency', currency: 'eur' }
				)}
			</p>

			{#if data.activePrices.includes(price.id) }
				<p>Contratado</p>
			{:else if price.type == 'recurring'}
				<NavButton text="Subscribe" href={relativeUrls.subscriptions.checkout(price.id)}/>
				{:else}
				<NavButton text="Buy now" href="/subscriptions/checkout?priceId={price.id}"/>
			{/if}

		</section>
		<br/>
		{/each}
	<br/>
{/each}
