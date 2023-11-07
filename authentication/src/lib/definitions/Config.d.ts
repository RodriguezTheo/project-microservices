import { Secret } from "jsonwebtoken";

type IDbEnv = {
  host: string;
  uri: string;
  user: string;
  password: string;
  port: number | string;
  database: string;

  [key: string]: string | number;
};

export type IConfig = {
  name: string;
  baseAPIRoute: string;
  port: number | string;
  db: IDbEnv;
  jwtSecret: string;
  startedMessage: string;

  [key: string]: string | number | Secret | IDbEnv;
};
