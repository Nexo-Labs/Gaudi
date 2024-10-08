import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'

import {
  text,
  checkbox,
  integer,
  relationship,
  json,
  select
} from '@keystone-6/core/fields'
import { type Lists } from '.keystone/types'


const subscriptionRelationship = `subscription   StripeSubscription @relation("StripeSubscriptionItem_subscription", fields: [subscriptionId], references: [id])
subscriptionId String             @map("subscription")
@@index([subscriptionId])
`

export const StripeModels = {
  StripeCustomer: list({
    access: allowAll,
    fields: {
        user: relationship({ ref: 'User.customer', many: false }),
        currency: text({ defaultValue: 'eur'}),
        delinquent: checkbox(),
        name: text({ db: { isNullable: true } }),
        description: text({ db: { isNullable: true } }),
        email: text({ db: { isNullable: true } }),
        phone: text({ db: { isNullable: true } }),
        invoicePrefix: text({ db: { isNullable: true } }),
        taxExempt: text({ db: { isNullable: true } }),
        created: integer({validation: { isRequired: true }}),
        balance: integer({validation: { isRequired: true }}),
        subscription: relationship({ ref: 'StripeSubscription.customer', many: false }),
        checkouts: relationship({ ref: 'StripeCheckoutSession.customer', many: true })
    },
  }),
  StripeSubscription: list({
    access: allowAll,
    fields: {
        customer: relationship({ ref: 'StripeCustomer.subscription', many: false }),
        startDate: integer({validation: { isRequired: true }}),
        endedAt: integer({ db: { isNullable: true } }),
        currentPeriodEnd: integer({validation: { isRequired: true }}),
        currentPeriodStart: integer({validation: { isRequired: true }}),
        canceledAt: integer({ db: { isNullable: true } }),
        cancelAtPeriodEnd: checkbox(),
        invoiceId: text({ db: { isNullable: true } }),
        description: text({ db: { isNullable: true } }),
        trialStart: integer({ db: { isNullable: true } }),
        trialEnd: integer({ db: { isNullable: true } }),
        currency: text({ defaultValue: 'eur'}),
        status: select({
          type: "enum",
          options: [
            { label: "Incompleto", value: "INCOMPLETE" },
            { label: "Expirado", value: "INCOMPLETE_EXPIRED" },
            { label: "En pruebas", value: "TRIALING" },
            { label: "Activo", value: "ACTIVE" },
            { label: "Vencido", value: "PAST_DUE" },
            { label: "Cancelado", value: "CANCELED" },
            { label: "No pagado", value: "UNPAID" },
          ]
        }),
        discounts: json(),
        discount: json(),
        subscriptionItems: relationship({ ref: 'StripeSubscriptionItem.subscription', many: true }),
    }
  }),
  StripeSubscriptionItem: list({
    access: allowAll,
    fields: {
      quantity: integer({ db: { isNullable: true } }),
      created: integer({validation: { isRequired: true }}),
      discounts: json(),
      subscription: relationship({ 
        ref: 'StripeSubscription.subscriptionItems', 
        many: false, 
        db: {extendPrismaSchema: () => subscriptionRelationship} 
      }),
      price: relationship({ 
        ref: 'StripePrice.subscriptionItem', 
        many: false, 
      })

    }
  }),
  StripePrice: list({
    access: allowAll,
    fields: {
      lookupKey: text({ db: { isNullable: true } }),
      active: checkbox(),
      billingScheme: text(),
      created: integer({validation: { isRequired: true }}),
      livemode: checkbox(),
      subscriptionItem: relationship({ 
        ref: 'StripeSubscriptionItem.price', 
        many: true
      }),
      product: relationship({ 
        ref: 'StripeProduct.prices', 
        many: false
      }),
      lineItems: relationship({
        ref: "StripeLineItem.price",
        many: true
      }),
      currency: text({ defaultValue: 'eur'}),
      unitAmount: integer(),
      unitAmountDecimal: text({ db: { isNullable: true } }),
      recurring: json(),
      metadata: json(),
      nickname: text({ db: { isNullable: true } }),
      type: text(),
      currencyOptions: json(),
      taxBehavior: text({ db: { isNullable: true } }),
      tiers: json(),
      tiersMode: json(),
      transformQuantity: json(),
    }
  }),
  StripeProduct: list({
    access: allowAll,
    fields: {
      active: checkbox(),
      name: text(),
      description: text({ db: { isNullable: true } }),
      taxCode: text({ db: { isNullable: true } }),
      type: select({
        type: "string",
        options: [
          { label: "Bien", value: "good" },
          { label: "Servicio", value: "service" }
        ]
      }),
      created: integer({validation: { isRequired: true }}),
      updated: integer({validation: { isRequired: true }}),
      unitLabel: text({ db: { isNullable: true } }),
      url: text({ db: { isNullable: true } }),
      images: json(),
      livemode: checkbox(),
      marketingFeatures: json(),
      metadata: json(),
      packageDimensions: json(),
      shippable: checkbox(),
      statementDescriptor: text({ db: { isNullable: true } }),
      prices: relationship({ ref: 'StripePrice.product', many: true })
    }
  }),
  StripeCheckoutSession: list({
    access: allowAll,
    fields: {
      customer: relationship({ref: "StripeCustomer.checkouts", many: false}),
      unitAmount: integer(),
      totalAmount: integer(),
      currency: text({ defaultValue: 'eur'}),
      allowPromotionCodes: checkbox(),
      clientReferenceId: text({ db: { isNullable: true } }),
      clientSecret: text({ db: { isNullable: true } }),
      consent: text({ db: { isNullable: true } }),
      consentCollection: text({ db: { isNullable: true } }),
      created: integer({validation: { isRequired: true }}),
      expiresAt: integer({ db: { isNullable: true } }),
      invoiceId: text({ db: { isNullable: true } }),
      invoiceCreation: text({ db: { isNullable: true } }),
      locale: text({ db: { isNullable: true } }),
      mode: text(),
      paymentIntentId: text({ db: { isNullable: true } }),
      paymentStatus: text(),
      recoveredFrom: text({ db: { isNullable: true } }),
      subscriptionId: text({ db: { isNullable: true } }),
      successUrl: text({ db: { isNullable: true } }),
      cancelUrl: text({ db: { isNullable: true } }),
      status: text({ db: { isNullable: true } }),
      url: text({ db: { isNullable: true } }),
      shippingAddressCollection: text({ db: { isNullable: true } }),
      shippingDetails: text({ db: { isNullable: true } }),
      livemode: checkbox(),
      lineItems: relationship({ref: "StripeLineItem.checkoutSession", many: true})
    }
  }),
  StripeLineItem: list({
    access: allowAll,
    fields: {
      ammountDiscount: integer(),
      ammountSubtotal: integer(),
      ammountTotal: integer(),
      ammountTax: integer(),
      currency: text({ defaultValue: 'eur'}),
      description: text(),
      taxes: json(),
      discounts: json(),
      price: relationship({ref: "StripePrice.lineItems", many: false}),
      checkoutSession: relationship({ref: "StripeCheckoutSession.lineItems", many: false})
    }
  })
} satisfies Lists
