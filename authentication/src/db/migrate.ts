import * as fs from "fs";
import { credentialsSeed } from "@/lib/placeholder-data";
import bcrypt from "bcrypt";
import { pool } from "@/environment/pg-config";

const migrate = async (): Promise<void> => {
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
  }
};

async function seedCredentials() {
  try {
    const insertedCredentials = await Promise.all(
      credentialsSeed.map(async (credential) => {
        const hashedPassword = await bcrypt.hash(credential.password, 10);
        const insertQuery = {
          text: `
            INSERT INTO credentials (email, password) 
            VALUES ($1, $2)
            RETURNING id;
          `,
          values: [credential.email, hashedPassword],
        };
        return await pool.query(insertQuery);
      })
    );

    console.log(`Seeded ${insertedCredentials.length} credentials`);

    return {
      credentials: insertedCredentials,
    };
  } catch (error) {
    console.error("credentials seed:", error);
    throw error;
  }
}

void (async () => {
  try {
    await migrate();
    await seedCredentials();
  } finally {
    await pool.end();
  }
})();
