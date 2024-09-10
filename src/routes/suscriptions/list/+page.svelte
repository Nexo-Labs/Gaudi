<script lang="ts">
	import type { PageData } from '../../pricing/$types.js';

	export let data: PageData;
</script>

<h1>Pricing</h1>

{#each data.products as product}
	{#if product.default_price && typeof product.default_price == 'object'}
		<section>
			<h2>{product.name}</h2>

			<p>
				Price: {((product.default_price.unit_amount || 0) / 100).toLocaleString('es-ES', {
					style: 'currency',
					currency: 'eur'
				})}
			</p>

      {#if product.default_price.type == 'recurring'}
        <a href="/suscriptions/checkout?priceId={product.default_price.id}">
          Subscribe
        </a>

        {:else}
        <a href="/suscriptions/checkout?priceId={product.default_price.id}">
          Buy now
        </a>
      {/if}

		</section>
	{/if}
  <br/>
{/each}
