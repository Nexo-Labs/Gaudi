import { stripe } from './lib/server/stripe/stripe_service.js';

const temp = await stripe.subscriptions.list()
console.log(temp.data)