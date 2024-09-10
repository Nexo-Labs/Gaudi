import { error, redirect } from '@sveltejs/kit';
import { getUser, restrictAuth } from '$src/lib/server/auth.service.js';
import { createSubscription, getPrice, createCheckout } from '$src/lib/server/stripe_service.js';
import { relativeUrls } from '$src/lib/domain/routing.js';

const expiredStates = [ 'INCOMPLETE_EXPIRED', 'CANCELED' ]

export const GET = async ({locals, url}) => {
    const user = await restrictAuth(locals)
    const priceId = url.searchParams.get('priceId');
    if (!priceId) return error(422 , 'priceId search param missing');

    const price = await getPrice(priceId);

    if (!price) throw error(406, 'Price could not be found.');

    if (price.type == 'recurring' && price.unit_amount == 0) {
        await createSubscription(user, price)
    
        return redirect(303, relativeUrls.subscriptions.list)
    } else {
        const checkoutResult = await createCheckout(url, user, price)
        if(checkoutResult.url) return redirect(303, checkoutResult.url)
        else throw error(406, 'Create checkout url failed');
    }
};