import { type Lists } from '.keystone/types'
import { CMSAdminUserModel } from './cms_models/cms_admin_user'
import { UserModels } from './cms_models/user'
import { StripeModels } from './cms_models/stripe'

export const lists = {
  ...CMSAdminUserModel,
  ...UserModels,
  ...StripeModels
} satisfies Lists
