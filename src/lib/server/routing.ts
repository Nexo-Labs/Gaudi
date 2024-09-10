import { env } from "$env/dynamic/private"

export const relativeUrls ={
        home: "/",
        subscriptions: {
            list: "/subscriptions/list",
            checkout: "/subscriptions/checkout",
            checkoutComplete: "/subscriptions/checkout/complete?checkout_session_id={CHECKOUT_SESSION_ID}",
            checkoutCancel: "/subscriptions/checkout/cancel",
            portal: "/subscriptions/portal",
        }
}



export function toAbsoluteUrl(path: string | URL) {
    return new URL(path, env.DOMAIN).toString()
}


