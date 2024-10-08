import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'

import {
  text,
  password,
  timestamp,
} from '@keystone-6/core/fields'

import { type Lists } from '.keystone/types'

export const CMSAdminUserModel = {
  CMSAdminUser: list({
    access: allowAll,

    fields: {
      name: text({ validation: { isRequired: true } }),

      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),

      password: password({ validation: { isRequired: true } }),

      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
    },
  })
} satisfies Lists
