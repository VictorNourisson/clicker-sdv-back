import { Pool } from "pg";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

export const pool = new Pool({
  connectionString: process.env.POSTGRES_URL_NON_POOLING,
  ssl: true,
});

pool.connect()
  .then((client) => {
    console.log("Connecté à la base de données PostgreSQL.");
    client.release();
  })
  .catch((error: unknown) => {
    console.error("Impossible de se connecter à la base de données :", error);
  });
