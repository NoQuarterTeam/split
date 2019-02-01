import { getConnectionOptions, createConnection } from "typeorm"

export default async () => {
  // Create DB connection
  const options = await getConnectionOptions(process.env.NODE_ENV)

  await createConnection({
    ...options,
    name: "default",
    // @ts-ignore
    url: process.env.DATABASE_URL,
  })
}
