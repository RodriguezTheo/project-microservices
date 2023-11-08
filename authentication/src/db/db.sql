-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateTable
CREATE TABLE "credentials" (
"id" UUID DEFAULT gen_random_uuid() NOT NULL,
"email" TEXT NOT NULL,
"password" TEXT NOT NULL,
"reset_password_required" BOOLEAN NOT NULL DEFAULT true,
"reset_password_requested" BOOLEAN NOT NULL DEFAULT false,
"is_active" BOOLEAN NOT NULL DEFAULT true,

CONSTRAINT "credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_reset_tokens" (
"id" UUID DEFAULT gen_random_uuid() NOT NULL,
"credentials_id" UUID NOT NULL,
"token" VARCHAR NOT NULL,

CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
"id" UUID DEFAULT gen_random_uuid() NOT NULL,
"credentials_id" UUID NOT NULL,
"token" VARCHAR NOT NULL,
"created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "credentials_email_key" ON "credentials"("email");

-- AddForeignKey
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_credentials_id_fkey" FOREIGN KEY ("credentials_id") REFERENCES "credentials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_credentials_id_fkey" FOREIGN KEY ("credentials_id") REFERENCES "credentials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
