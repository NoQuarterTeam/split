import { getConnectionOptions, createConnection } from "typeorm"
import { NODE_ENV, DATABASE_URL } from "../config"

export const createDbConnection = async () => {
  // Create DB connection
  const options = await getConnectionOptions(NODE_ENV)

  return await createConnection({
    ...options,
    name: "default",
    // @ts-ignore
    url: DATABASE_URL,
  })
}
