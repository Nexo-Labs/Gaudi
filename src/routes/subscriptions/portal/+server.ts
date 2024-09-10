import { getUser, restrictAuth } from "$src/lib/server/auth.service.js";
import { createPortalSession } from "$src/lib/server/stripe_service.js";
import { redirect } from "@sveltejs/kit";


export const GET = async ({locals, url}) => {
    const user = await restrictAuth(locals)
    
    const session = await createPortalSession(url, user)
    redirect(303, session.url)
};