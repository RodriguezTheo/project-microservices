import * as fs from "fs";
import { Pool } from "pg";
import { config } from "@/environment/config";

const migrate = async (): Promise<void> => {
  const { host, database, port, user, password } = config.db;

  const pool = new Pool({
    host,
    database,
    port,
    user,
    password,
  });
  try {
    await pool.query(`
      DO $$ 
      DECLARE rec RECORD; 
      BEGIN
        FOR rec IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
          EXECUTE 'DROP TABLE IF EXISTS ' || rec.tablename || ' CASCADE';
        END LOOP;
      END $$;
    `);
    const sql = fs.readFileSync("./src/db/db.sql", "utf8");
    await pool.query(sql);
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
};

void migrate();
