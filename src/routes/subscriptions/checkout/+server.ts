import { error, redirect } from '@sveltejs/kit';
import { restrictAuth } from '$src/lib/server/auth.service.js';
import { getPrice, createCheckout } from '$src/lib/server/stripe_service.js';

const expiredStates = [ 'INCOMPLETE_EXPIRED', 'CANCELED' ]

export const GET = async ({locals, url}) => {
    const user = await restrictAuth(locals)
    const priceId = url.searchParams.get('priceId');
    if (!priceId) return error(422 , 'priceId search param missing');

    const price = await getPrice(priceId);

    if (!price) throw error(406, 'Price could not be found.');

    const checkoutResult = await createCheckout(url, user, price)
    if(checkoutResult.url) return redirect(303, checkoutResult.url)
    else throw error(406, 'Create checkout url failed');
};