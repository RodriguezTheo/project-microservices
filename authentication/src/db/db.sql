CREATE TABLE "credentials" (
"id" uuid PRIMARY KEY NOT NULL,
"email" varchar UNIQUE NOT NULL,
"password" varchar NOT NULL,
"reset_password_required" boolean NOT NULL DEFAULT true,
"reset_password_requested" boolean NOT NULL DEFAULT false,
"is_active" boolean NOT NULL DEFAULT true
);

CREATE TABLE "sessions" (
"id" uuid PRIMARY KEY NOT NULL,
"credentials_id" uuid NOT NULL,
"token" varchar NOT NULL,
"created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY ("credentials_id") REFERENCES "credentials" ("id")
);

CREATE TABLE "password_reset_tokens" (
 "id" uuid PRIMARY KEY NOT NULL,
 "credentials_id" uuid NOT NULL,
 "token" varchar NOT NULL,
 FOREIGN KEY ("credentials_id") REFERENCES "credentials" ("id")
);
