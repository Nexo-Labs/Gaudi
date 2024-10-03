import type { ContentCMSType } from "./prisma-enum-mapping.js";

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
			videos: '/admin/content/video',
			articles: '/admin/content/article',
			books: '/admin/content/book',
		},
		contentEdit: (type: ContentCMSType, id: string): string => `/admin/content/${type.toLowerCase()}/${id}`,
		contentRemove: (id: string): string => `/admin/content/video/${id}`,
	},
	user: {
		profile: '/user/account'
	}
};
