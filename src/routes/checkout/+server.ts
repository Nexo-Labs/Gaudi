import { stripe } from "../stripe.js";
import type { RequestHandler } from "@sveltejs/kit";
import type { CartItem } from "$src/cart.ts";

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const cartItems: CartItem[] = data.items;

  // Create session for redirecting users
  const lineItems = cartItems.map((item) => {
    return {
      price_data: {
        currency: "EUR",
        product_data: {
          name: item.name,
          images: [],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.amount,
    };
  });

  // Create session
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:5173/checkout/success`,
    cancel_url: `http://localhost:5173/checkout/cancel`,
  });

  return new Response(
    JSON.stringify({
      url: session.url,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
