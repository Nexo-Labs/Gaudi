import { SvelteKitAuth as BaseAuth } from '@auth/sveltekit'
import { sequence } from '@sveltejs/kit/hooks'

export function EscotaAuth(options  = {}) {
  if (!options.providers || options.providers.length == 0)
    throw new Error('Must have at least one provider')

  if (!options.adapter) throw new Error('An adapter is required')

  options.pages ||= {}
  options.pages.newUser ||= '/'

  const { handle, ...rest } = authHandler(options)

  return { ...rest, handle: sequence(handle) }
}
function authHandler(options) {
  return BaseAuth({
    ...options,

    callbacks: {
      async session({ session }) {
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

        return session
      },

      ...(options.callbacks || {})
    }
  })
}
