import { upsertPrice } from "../../prisma/price/upsert_stripe_price_prisma.js";
import { getPricesWithProduct } from "./get_product_with_prices.js";

export async function syncProducts() {
    const prices = await getPricesWithProduct()
    prices.forEach(async (price) => {
        await upsertPrice(price)
    });
}
