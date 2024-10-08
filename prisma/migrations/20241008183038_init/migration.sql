-- CreateEnum
CREATE TYPE "StripeSubscriptionStatusType" AS ENUM ('INCOMPLETE', 'INCOMPLETE_EXPIRED', 'TRIALING', 'ACTIVE', 'PAST_DUE', 'CANCELED', 'UNPAID');

-- CreateTable
CREATE TABLE "CMSAdminUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CMSAdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "roles" JSONB,
    "stripeRoles" JSONB,
    "locales" JSONB,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL DEFAULT '',
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "user" TEXT,
    "type" TEXT NOT NULL DEFAULT '',
    "provider" TEXT NOT NULL DEFAULT '',
    "providerAccountId" TEXT NOT NULL DEFAULT '',
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "id_token" TEXT,
    "token_type" TEXT,
    "scope" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL DEFAULT '',
    "token" TEXT NOT NULL DEFAULT '',
    "expires" TIMESTAMP(3),

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeCustomer" (
    "id" TEXT NOT NULL,
    "user" TEXT,
    "currency" TEXT NOT NULL DEFAULT 'eur',
    "delinquent" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT,
    "description" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "invoicePrefix" TEXT,
    "taxExempt" TEXT,
    "created" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,
    "subscription" TEXT,

    CONSTRAINT "StripeCustomer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeSubscription" (
    "id" TEXT NOT NULL,
    "startDate" INTEGER NOT NULL,
    "endedAt" INTEGER,
    "currentPeriodEnd" INTEGER NOT NULL,
    "currentPeriodStart" INTEGER NOT NULL,
    "canceledAt" INTEGER,
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "invoiceId" TEXT,
    "description" TEXT,
    "trialStart" INTEGER,
    "trialEnd" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'eur',
    "status" "StripeSubscriptionStatusType",
    "discounts" JSONB,
    "discount" JSONB,

    CONSTRAINT "StripeSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeSubscriptionItem" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER,
    "created" INTEGER NOT NULL,
    "discounts" JSONB,
    "subscription" TEXT NOT NULL,
    "price" TEXT,

    CONSTRAINT "StripeSubscriptionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripePrice" (
    "id" TEXT NOT NULL,
    "lookupKey" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "billingScheme" TEXT NOT NULL DEFAULT '',
    "created" INTEGER NOT NULL,
    "livemode" BOOLEAN NOT NULL DEFAULT false,
    "product" TEXT,
    "currency" TEXT NOT NULL DEFAULT 'eur',
    "unitAmount" INTEGER,
    "unitAmountDecimal" TEXT,
    "recurring" JSONB,
    "metadata" JSONB,
    "nickname" TEXT,
    "type" TEXT NOT NULL DEFAULT '',
    "currencyOptions" JSONB,
    "taxBehavior" TEXT,
    "tiers" JSONB,
    "tiersMode" JSONB,
    "transformQuantity" JSONB,

    CONSTRAINT "StripePrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeProduct" (
    "id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL DEFAULT '',
    "description" TEXT,
    "taxCode" TEXT,
    "type" TEXT,
    "created" INTEGER NOT NULL,
    "updated" INTEGER NOT NULL,
    "unitLabel" TEXT,
    "url" TEXT,
    "images" JSONB,
    "livemode" BOOLEAN NOT NULL DEFAULT false,
    "marketingFeatures" JSONB,
    "metadata" JSONB,
    "packageDimensions" JSONB,
    "shippable" BOOLEAN NOT NULL DEFAULT false,
    "statementDescriptor" TEXT,

    CONSTRAINT "StripeProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeCheckoutSession" (
    "id" TEXT NOT NULL,
    "customer" TEXT,
    "unitAmount" INTEGER,
    "totalAmount" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'eur',
    "allowPromotionCodes" BOOLEAN NOT NULL DEFAULT false,
    "clientReferenceId" TEXT,
    "clientSecret" TEXT,
    "consent" TEXT,
    "consentCollection" TEXT,
    "created" INTEGER NOT NULL,
    "expiresAt" INTEGER,
    "invoiceId" TEXT,
    "invoiceCreation" TEXT,
    "locale" TEXT,
    "mode" TEXT NOT NULL DEFAULT '',
    "paymentIntentId" TEXT,
    "paymentStatus" TEXT NOT NULL DEFAULT '',
    "recoveredFrom" TEXT,
    "subscriptionId" TEXT,
    "successUrl" TEXT,
    "cancelUrl" TEXT,
    "status" TEXT,
    "url" TEXT,
    "shippingAddressCollection" TEXT,
    "shippingDetails" TEXT,
    "livemode" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "StripeCheckoutSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeLineItem" (
    "id" TEXT NOT NULL,
    "ammountDiscount" INTEGER,
    "ammountSubtotal" INTEGER,
    "ammountTotal" INTEGER,
    "ammountTax" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'eur',
    "description" TEXT NOT NULL DEFAULT '',
    "taxes" JSONB,
    "discounts" JSONB,
    "price" TEXT,
    "checkoutSession" TEXT,

    CONSTRAINT "StripeLineItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CMSAdminUser_email_key" ON "CMSAdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "Account_user_idx" ON "Account"("user");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "StripeCustomer_user_key" ON "StripeCustomer"("user");

-- CreateIndex
CREATE UNIQUE INDEX "StripeCustomer_subscription_key" ON "StripeCustomer"("subscription");

-- CreateIndex
CREATE INDEX "StripeSubscriptionItem_subscription_idx" ON "StripeSubscriptionItem"("subscription");

-- CreateIndex
CREATE INDEX "StripeSubscriptionItem_price_idx" ON "StripeSubscriptionItem"("price");

-- CreateIndex
CREATE INDEX "StripePrice_product_idx" ON "StripePrice"("product");

-- CreateIndex
CREATE INDEX "StripeCheckoutSession_customer_idx" ON "StripeCheckoutSession"("customer");

-- CreateIndex
CREATE INDEX "StripeLineItem_price_idx" ON "StripeLineItem"("price");

-- CreateIndex
CREATE INDEX "StripeLineItem_checkoutSession_idx" ON "StripeLineItem"("checkoutSession");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeCustomer" ADD CONSTRAINT "StripeCustomer_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeCustomer" ADD CONSTRAINT "StripeCustomer_subscription_fkey" FOREIGN KEY ("subscription") REFERENCES "StripeSubscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeSubscriptionItem" ADD CONSTRAINT "StripeSubscriptionItem_subscription_fkey" FOREIGN KEY ("subscription") REFERENCES "StripeSubscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeSubscriptionItem" ADD CONSTRAINT "StripeSubscriptionItem_price_fkey" FOREIGN KEY ("price") REFERENCES "StripePrice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripePrice" ADD CONSTRAINT "StripePrice_product_fkey" FOREIGN KEY ("product") REFERENCES "StripeProduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeCheckoutSession" ADD CONSTRAINT "StripeCheckoutSession_customer_fkey" FOREIGN KEY ("customer") REFERENCES "StripeCustomer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeLineItem" ADD CONSTRAINT "StripeLineItem_price_fkey" FOREIGN KEY ("price") REFERENCES "StripePrice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeLineItem" ADD CONSTRAINT "StripeLineItem_checkoutSession_fkey" FOREIGN KEY ("checkoutSession") REFERENCES "StripeCheckoutSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;
