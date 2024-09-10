<script lang="ts">
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
					'es-ES', {
						style: 'currency',
						currency: 'eur'
					}
				)}
			</p>

      {#if price.type == 'recurring'}
        <a href="/suscriptions/checkout?priceId={price.id}">
          Subscribe
        </a>

        {:else}
        <a href="/suscriptions/checkout?priceId={price.id}">
          Buy now
        </a>
      {/if}

		</section>
		<br/>
		{/each}
	<br/>
{/each}
