import { config } from "@/environment/config";
import { Pool } from "pg";

const { host, database, port, user, password } = config.db;
export const pool = new Pool({
  host,
  database,
  port,
  user,
  password,
});
