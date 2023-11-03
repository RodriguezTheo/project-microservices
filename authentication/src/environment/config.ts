import * as process from "process";
import dotenv, { DotenvConfigOptions } from "dotenv";

dotenv.config(<DotenvConfigOptions>{ silent: true });

type Config = {
  name: string | undefined;
  baseAPIRoute: string | undefined;
  port: string;
  db: {
    uri: string | undefined;
    username: string | undefined;
    password: string | undefined;
  };
  jwtSecret: string;
  startedMessage: string;
};

const config: Config = {
  name: process.env.SERVICE_NAME,
  baseAPIRoute: process.env.SERVICE_ROUTE,
  port: process.env.PORT || "8080",
  db: {
    uri: process.env.DB_URI,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  jwtSecret: process.env.JWT_SECRET || "",
  startedMessage: `⚡️[Authentication service] : running at ${process.env.SERVICE_ROUTE}`,
};

export { config };
