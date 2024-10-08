import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'

import {
  text,
  timestamp,
  json,
  relationship,
  integer
} from '@keystone-6/core/fields'

import { type Lists } from '.keystone/types'

const userRelationship = `userId       String
user         User     @relation("Session_user", fields: [userId], references: [id], onDelete: Cascade)
@@index([userId])
`

export const UserModels = {
  User: list({
    access: allowAll,
    fields: {
        name: text({ db: { isNullable: true } }),
        email: text({ isIndexed: 'unique', db: { isNullable: true } }),
        emailVerified: timestamp(),
        image: text({ db: { isNullable: true } }),

        roles: json(),
        stripeRoles: json(),
        locales: json(),

        accounts: relationship({ ref: 'Account.user', many: true }),   
        sessions: relationship({ ref: 'Session.user', many: true }),
        customer: relationship({ ref: 'StripeCustomer.user', many: false }),
      },
  }),
  Session: list({
    access: allowAll,
    fields: {
      user: relationship({ 
        ref: 'User.sessions', 
        many: false, 
        db: {extendPrismaSchema: () => {return userRelationship}}  
    }),
      sessionToken: text({ isIndexed: 'unique', validation: { isRequired: true }, defaultValue: undefined }),
      expires: timestamp({ validation: { isRequired: true } })
    },
  }),
  Account: list({
    access: allowAll,
    fields: {
        user: relationship({ ref: 'User.accounts', many: false }),
        type: text({ validation: { isRequired: true } }),
        provider: text({ validation: { isRequired: true } }),
        providerAccountId: text({ validation: { isRequired: true } }),
        refresh_token: text({ db: { isNullable: true } }),
        access_token: text({ db: { isNullable: true } }),
        expires_at: integer({ db: { isNullable: true } }),
        id_token: text({ db: { isNullable: true } }),
        token_type: text({ db: { isNullable: true } }),
        scope: text({ db: { isNullable: true } }),
        session_state: text({ db: { isNullable: true } }),
    }
  }),
  VerificationToken: list({
    access: allowAll,
    fields: {
      identifier: text({ validation: { isRequired: true } }),
      token: text({ isIndexed: 'unique', validation: { isRequired: true } }),
      expires: timestamp()
    }
  })
} satisfies Lists
