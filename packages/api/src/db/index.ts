import { getConnectionOptions, createConnection } from "typeorm"
import { NODE_ENV, DATABASE_URL, isProduction } from "../lib/config"

export const createDbConnection = async (migrate = false) => {
  // Create DB connection
  const options = await getConnectionOptions(NODE_ENV)

  // @ts-ignore
  const connection = await createConnection({
    ...options,
    name: "default",
    // @ts-ignore
    url: DATABASE_URL,
  })

  // Run migrations in production
  if (migrate && isProduction) await connection.runMigrations()
}
