import { getUser, restrictAuth } from "$src/lib/server/auth.service.js";
import { createPortalSession } from "$src/lib/server/stripe_service.js";
import { redirect } from "@sveltejs/kit";
import type Stripe from "stripe";


export const GET = async ({locals, url}) => {
    const user = await restrictAuth(locals)
    const cancelSubscriptionId = url.searchParams.get('cancelSubscriptionId');
    const updateSubscriptionId = url.searchParams.get('updateSubscriptionId');
    
    let flowData: Stripe.BillingPortal.SessionCreateParams.FlowData | undefined
    if (cancelSubscriptionId)
        flowData = { type: "subscription_cancel", subscription_cancel: { subscription: cancelSubscriptionId }}
    else if (updateSubscriptionId) 
        flowData = { type: "subscription_update", subscription_update: { subscription: updateSubscriptionId }}
    const session = await createPortalSession(url, user, flowData)
    redirect(303, session.url)
};