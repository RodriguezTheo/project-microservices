CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "credentials" (
"id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
"email" text UNIQUE NOT NULL,
"password" text NOT NULL,
"reset_password_required" boolean NOT NULL DEFAULT true,
"reset_password_requested" boolean NOT NULL DEFAULT false,
"is_active" boolean NOT NULL DEFAULT true
);

CREATE TABLE "sessions" (
"id" uuid DEFAULT uuid_generate_v4()  PRIMARY KEY NOT NULL,
"credentials_id" uuid NOT NULL,
"token" varchar NOT NULL,
"created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY ("credentials_id") REFERENCES "credentials" ("id")
);

CREATE TABLE "password_reset_tokens" (
 "id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
 "credentials_id" uuid NOT NULL,
 "token" varchar NOT NULL,
 FOREIGN KEY ("credentials_id") REFERENCES "credentials" ("id")
);
