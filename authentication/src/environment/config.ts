import dotenv, { DotenvConfigOptions } from "dotenv";
import { IConfig } from "@/lib/definitions/Config";

dotenv.config(<DotenvConfigOptions>{ silent: true });

const {
  SERVICE_NAME,
  SERVICE_ROUTE,
  PORT,
  DB_HOST,
  DB_URI,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_NAME,
  JWT_SECRET,
} = process.env;

const config: IConfig = {
  name: SERVICE_NAME || "Default Name",
  baseAPIRoute: SERVICE_ROUTE || "http://localhost:8080/",
  port: Number(PORT) || "8080",
  db: {
    host: DB_HOST || "localhost",
    uri:
      DB_URI || "postgresql://user:password@localhost:5432/myDb?schema=public",
    user: DB_USER || "user",
    password: DB_PASSWORD || "password",
    port: Number(DB_PORT) || "5432",
    database: DB_NAME || "myDb",
  },
  jwtSecret: JWT_SECRET || "MySecretKey",
  startedMessage: `⚡️[${SERVICE_NAME}] : running at ${SERVICE_ROUTE}`,
};

export { config };
