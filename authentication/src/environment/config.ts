import * as process from "process";
import dotenv, { DotenvConfigOptions } from "dotenv";

dotenv.config(<DotenvConfigOptions>{ silent: true });

type Config = {
  name: string | undefined;
  baseAPIRoute: string | undefined;
  port: string;
  db: {
    host: string | undefined;
    uri: string | undefined;
    user: string | undefined;
    password: string | undefined;
    port: string | undefined;
    database: string | undefined;
  };
  jwtSecret: string;
  startedMessage: string;
};

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

const config: Config = {
  name: SERVICE_NAME,
  baseAPIRoute: SERVICE_ROUTE,
  port: PORT || "8080",
  db: {
    host: DB_HOST,
    uri: DB_URI,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_NAME,
  },
  jwtSecret: JWT_SECRET || "",
  startedMessage: `⚡️[${SERVICE_NAME}] : running at ${SERVICE_ROUTE}`,
};

export { config };
