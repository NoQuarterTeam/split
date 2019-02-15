import { getConnectionOptions, createConnection } from "typeorm"

export const createDbConnection = async () => {
  // Create DB connection
  const options = await getConnectionOptions(process.env.NODE_ENV)

  await createConnection({
    ...options,
    name: "default",
  })
}
