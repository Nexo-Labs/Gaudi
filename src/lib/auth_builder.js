import { SvelteKitAuth as BaseAuth } from '@auth/sveltekit'
import { createCatalog } from '$lib/server/catalog.js'
import { createBillingService } from '$lib/server/billing.js'
import { sequence } from '@sveltejs/kit/hooks'
import { routes } from '$lib/server/routes'


export function EscotaAuth(options  = {}) {
  if (!options.providers || options.providers.length == 0)
    throw new Error('Must have at least one provider')

  if (!options.adapter) throw new Error('An adapter is required')

  options.pages ||= {}
  options.pages.newUser ||= '/billing/checkout'
  options.pages.checkout ||= {}
  options.pages.checkout.success = '/?event=checkout-success'
  options.pages.checkout.cancel = '/?event=checkout-cancel'
  options.pages.portalReturn ||= '/?event=portal-return'

  const catalog = createCatalog()
  const billing = createBillingService(options.adapter, options.pages)
  const state = {
    catalog,
    billing,
    options
  }
  const { handle, ...rest } = authHandler(options)

  return { ...rest, handle: sequence(handle, paymentHandler(state)) }
}

function authHandler(options) {
  return BaseAuth({
    ...options,

    callbacks: {
      async jwt({ user, token, account, profile }) {
        if (user) {
          token.id = user.id;
        }
        if (profile) {
          token.preferred_username = profile.preferred_username;
          token.given_name = profile.given_name;
          token.family_name = profile.family_name;
        }
        if (account) {
          token.idToken = account.id_token;
          token.accessToken = account.access_token;
          token.refreshToken = account.refresh_token;
        }
  
        return token;
      },
      async session({ session, token }) {
        const user = await options.adapter.getUserByEmail(session.user.email)

        if (user?.customerId) {
          session.customerId = user.customerId
        }

        if (user?.subscriptionId) {
          session.subscription = {
            id: user.subscriptionId,
            priceId: user.priceId,
            plan: user.plan,
            status: user.subscriptionStatus.toLowerCase()
          }
        }

        if (user?.purchases) {
          let purchases = []

          user.purchases.forEach(({ productId, priceId, lookupKey }) => {
            purchases.push(productId)
            purchases.push(priceId)
            purchases.push(lookupKey)
          })

          session.purchases = purchases
        }

        if (session.user) {
          delete session.user.customerId
          delete session.user.subscriptionId
          delete session.user.subscriptionStatus
          delete session.user.plan
          delete session.user.priceId
          delete session.user.purchases
        }

        if (options?.callbacks?.session) {
          return await options.callbacks.session(arguments)
        }
        session.user = { ...token };
        return session;
      },

      ...(options.callbacks || {})
    }
  })
}

function paymentHandler(state) {
  return async ({ event, resolve }) => {
    const session = await event.locals.getSession()
    const route = routes[event.url.pathname]

    if (route && route.method == event.request.method) {
      const user = session ? await state.options.adapter.getUserByEmail(session.user.email) : null

      return await route.handler(event, { ...state, session, user })
    }

    return await resolve(event)
  }
}
