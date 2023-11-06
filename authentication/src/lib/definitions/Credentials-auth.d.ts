import { credentials } from "@prisma/client";

export type CredentialsLogin = Omit<
  credentials,
  "id" | "reset_password_required" | "reset_password_requested" | "is_active"
>;
