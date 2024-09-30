-- CreateEnum
CREATE TYPE "StripeProductType" AS ENUM ('service', 'good');

-- CreateEnum
CREATE TYPE "StripeSubscriptionStatus" AS ENUM ('INCOMPLETE', 'INCOMPLETE_EXPIRED', 'TRIALING', 'ACTIVE', 'PAST_DUE', 'CANCELED', 'UNPAID');

-- CreateEnum
CREATE TYPE "ContentCMSType" AS ENUM ('VIDEO', 'ARTICLE', 'BOOK', 'QUOTE', 'PHOTO');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "roles" TEXT[],
    "stripeRoles" TEXT[],
    "locales" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeCustomer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currency" TEXT,
    "delinquent" BOOLEAN,
    "name" TEXT,
    "description" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "invoicePrefix" TEXT,
    "taxExempt" TEXT,
    "created" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,
    "subscriptionId" TEXT,

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
    "cancelAtPeriodEnd" BOOLEAN NOT NULL,
    "invoiceId" TEXT,
    "description" TEXT,
    "trialStart" INTEGER,
    "trialEnd" INTEGER,
    "currency" TEXT NOT NULL,
    "status" "StripeSubscriptionStatus" NOT NULL,
    "discounts" JSONB,
    "discount" JSONB,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "StripeSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeSubscriptionItem" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER,
    "created" INTEGER NOT NULL,
    "discounts" JSONB,
    "subscriptionId" TEXT NOT NULL,
    "priceId" TEXT NOT NULL,

    CONSTRAINT "StripeSubscriptionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeCheckoutSession" (
    "id" TEXT NOT NULL,
    "customerId" TEXT,
    "unitAmount" INTEGER,
    "totalAmount" INTEGER,
    "currency" TEXT,
    "allowPromotionCodes" BOOLEAN,
    "clientReferenceId" TEXT,
    "clientSecret" TEXT,
    "consent" TEXT,
    "consentCollection" TEXT,
    "created" INTEGER NOT NULL,
    "expiresAt" INTEGER,
    "invoiceId" TEXT,
    "invoiceCreation" TEXT,
    "locale" TEXT,
    "mode" TEXT NOT NULL,
    "paymentIntentId" TEXT,
    "paymentStatus" TEXT NOT NULL,
    "recoveredFrom" TEXT,
    "subscriptionId" TEXT,
    "successUrl" TEXT,
    "cancelUrl" TEXT,
    "status" TEXT,
    "url" TEXT,
    "livemode" BOOLEAN NOT NULL,
    "shippingAddressCollection" TEXT,
    "shippingDetails" TEXT,

    CONSTRAINT "StripeCheckoutSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeProduct" (
    "id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "taxCode" TEXT,
    "type" "StripeProductType" NOT NULL,
    "created" INTEGER NOT NULL,
    "updated" INTEGER NOT NULL,
    "unitLabel" TEXT,
    "url" TEXT,
    "images" TEXT[],
    "livemode" BOOLEAN NOT NULL,
    "marketingFeatures" JSONB,
    "packageDimensions" JSONB,
    "shippable" BOOLEAN,
    "statementDescriptor" TEXT,

    CONSTRAINT "StripeProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeLineItem" (
    "id" TEXT NOT NULL,
    "ammountDiscount" INTEGER NOT NULL,
    "ammountSubtotal" INTEGER NOT NULL,
    "ammountTotal" INTEGER NOT NULL,
    "ammountTax" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priceId" TEXT NOT NULL,
    "checkoutSessionId" TEXT NOT NULL,
    "taxes" JSONB,
    "discounts" JSONB,

    CONSTRAINT "StripeLineItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripePrice" (
    "id" TEXT NOT NULL,
    "lookupKey" TEXT,
    "active" BOOLEAN NOT NULL,
    "billingScheme" TEXT NOT NULL,
    "created" INTEGER NOT NULL,
    "liveMode" BOOLEAN NOT NULL,
    "currency" TEXT NOT NULL,
    "unitAmount" INTEGER,
    "unitAmountDecimal" TEXT,
    "recurring" JSONB,
    "metadata" JSONB NOT NULL,
    "nickname" TEXT,
    "type" TEXT NOT NULL,
    "currencyOptions" JSONB,
    "taxBehavior" TEXT,
    "tiers" JSONB,
    "tiersMode" JSONB,
    "transformQuantity" JSONB,
    "productId" TEXT NOT NULL,

    CONSTRAINT "StripePrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "ContentCMS" (
    "id" TEXT NOT NULL,
    "type" "ContentCMSType" NOT NULL,
    "data" JSONB NOT NULL,
    "seeds" TEXT[],
    "permissions" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentCMS_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "StripeCustomer_userId_key" ON "StripeCustomer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "StripeSubscription_customerId_key" ON "StripeSubscription"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeCustomer" ADD CONSTRAINT "StripeCustomer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeSubscription" ADD CONSTRAINT "StripeSubscription_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "StripeCustomer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeSubscriptionItem" ADD CONSTRAINT "StripeSubscriptionItem_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "StripeSubscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeSubscriptionItem" ADD CONSTRAINT "StripeSubscriptionItem_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "StripePrice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeCheckoutSession" ADD CONSTRAINT "StripeCheckoutSession_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "StripeCustomer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeLineItem" ADD CONSTRAINT "StripeLineItem_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "StripePrice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeLineItem" ADD CONSTRAINT "StripeLineItem_checkoutSessionId_fkey" FOREIGN KEY ("checkoutSessionId") REFERENCES "StripeCheckoutSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripePrice" ADD CONSTRAINT "StripePrice_productId_fkey" FOREIGN KEY ("productId") REFERENCES "StripeProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;
