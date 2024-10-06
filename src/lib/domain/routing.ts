export const relativeUrls = {
	home: '/',
	subscriptions: {
		list: '/subscriptions',
		checkout: (priceId: string): string => `/subscriptions/checkout?priceId=${priceId}`,
		checkoutComplete: '/subscriptions/checkout/complete?checkout_session_id={CHECKOUT_SESSION_ID}',
		checkoutCancel: '/subscriptions/checkout/cancel',
		updateSubscription: (subscriptionId: string, cancelAtPeriodEnd: boolean): string =>
			`/subscriptions/update?subscriptionId=${subscriptionId}&cancelAtPeriodEnd=${cancelAtPeriodEnd}`,
		portalCancelSubscription: (subsriptionId: string): string =>
			`/subscriptions/portal?cancelSubscriptionId=${subsriptionId}`,
		portalUpdateSubscription: (subsriptionId: string): string =>
			`/subscriptions/portal?updateSubscriptionId=${subsriptionId}`,
		portal: '/subscriptions/portal'
	},
	admin: {
		users: '/admin/users',
		content: {
			root: '/admin/content',
			videos: '/admin/content/videos',
			articles: '/admin/content/artículos',
		}
	},
	user: {
		profile: '/user/account'
	}
};
