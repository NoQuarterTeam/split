import "reflect-metadata"
import "dotenv/config"
import { ApolloServer } from "apollo-server-express"
import express, { Request, Response } from "express"
import cors from "cors"
import session from "express-session"
import morgan from "morgan"
import {
  useContainer,
  formatArgumentValidationError,
  buildSchema,
} from "type-graphql"
import { Container } from "typedi"

import { createDbConnection } from "./db"
import { authChecker } from "./lib/authChecker"
import {
  sessionOptions,
  corsOptions,
  port,
  arena,
  resolverPaths,
  webUrl,
} from "./config"

useContainer(Container)

async function main() {
  try {
    await createDbConnection()

    const app = express()
      .use(
        cors({
          credentials: true,
          origin: [webUrl],
        }),
      )
      .set("trust proxy", 1)
      .enable("trust proxy")
      .use(session(sessionOptions))
      .use(morgan("dev"))
      .use("/", arena)

    const schema = await buildSchema({
      authChecker,
      resolvers: [__dirname + resolverPaths],
      validate: false,
    })

    const apolloServer = new ApolloServer({
      context: ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
      }),
      formatError: formatArgumentValidationError,
      introspection: true,
      playground: true,
      schema,
    })

    apolloServer.applyMiddleware({
      app,
      cors: corsOptions,
    })

    app.listen(port, () =>
      console.log(`Server started at http://localhost:${port} 🚀`),
    )
  } catch (error) {
    console.log(error)
  }
}

main()
