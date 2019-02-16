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

    const app = express().use(morgan("dev"))

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

    app.set("trust proxy", 1).use(
      cors({
        credentials: true,
        origin: [webUrl],
      }),
    )

    app.use((req, _, next) => {
      const authorization = req.headers.authorization

      if (authorization) {
        try {
          const qid = authorization.split(" ")[1]
          req.headers.cookie = `qid=${qid}`
        } catch {}
      }
      return next()
    })

    app.use(session(sessionOptions)).use("/", arena)

    apolloServer.applyMiddleware({
      app,
      cors: false,
    })

    app.listen(port, () =>
      console.log(`Server started at http://localhost:${port} 🚀`),
    )
  } catch (error) {
    console.log(error)
  }
}

main()
