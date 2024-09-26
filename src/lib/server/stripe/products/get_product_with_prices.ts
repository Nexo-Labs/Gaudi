import type Stripe from "stripe";
import { stripe } from "../stripe_service.js";

export type ProductWithPrices = Stripe.Product & {
	prices: Stripe.Price[];
};

export async function getPricesWithProduct(): Promise<Stripe.Price[]> {
	return (
		await stripe.prices.list({
			expand: ['data.product']
		})
	).data;
}

export async function getProductWithPrices(): Promise<ProductWithPrices[]> {
	const prices = await getPricesWithProduct();
	const productsMap: Record<string, ProductWithPrices> = {};

	prices.forEach((price) => {
		const product = price.product as Stripe.Product;
		if (!product.active) return;
		if (!productsMap[product.id]) {
			productsMap[product.id] = {
				...product,
				prices: []
			};
		}

		productsMap[product.id].prices.push(price);
	});

	return Object.values(productsMap);
}
