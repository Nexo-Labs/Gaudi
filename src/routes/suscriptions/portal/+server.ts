import { getUser } from "$src/lib/server/auth.service.js";
import { getPrice, createSubscription, createPortalSession } from "$src/lib/server/stripe_service.js";
import { error, redirect } from "@sveltejs/kit";


export const GET = async ({locals, url}) => {
    const user = await getUser(locals)
    if (!user) return redirect(303, `/auth/signin?callbackUrl=${url.pathname}${url.search}`);

    const session = await createPortalSession(user)
};