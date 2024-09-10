
export const relativeUrls ={
        home: "/",
        subscriptions: {
            list: "/subscriptions/list",
            checkout: (priceId: string): string => `/subscriptions/checkout?priceId=${priceId}`,
            checkoutComplete: "/subscriptions/checkout/complete?checkout_session_id={CHECKOUT_SESSION_ID}",
            checkoutCancel: "/subscriptions/checkout/cancel",
            portal: "/subscriptions/portal",
        }
}



