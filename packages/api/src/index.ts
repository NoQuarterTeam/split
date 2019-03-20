import "reflect-metadata"
import "dotenv/config"
import { ApolloServer } from "apollo-server-express"
import express, { Response } from "express"
import jwt from "express-jwt"
import morgan from "morgan"
import {
  useContainer,
  formatArgumentValidationError,
  buildSchema,
} from "type-graphql"
import { Container } from "typedi"

import { createDbConnection } from "./db"
import { authChecker } from "./lib/authChecker"

import { cors, PORT, resolverPaths, APP_SECRET } from "./config"
import { userLoader } from "./modules/user/user.loader"
import { shareLoader } from "./modules/share/share.loader"
import { IRequest } from "./lib/types"

useContainer(Container)

async function main() {
  try {
    const connection = await createDbConnection()
    await connection.runMigrations()

    const app = express()
      .use(morgan("dev"))
      .use(
        jwt({
          secret: APP_SECRET,
          credentialsRequired: false,
        }),
      )
      .use((err: any, _: any, __: any, next: any) => {
        if (err.name === "UnauthorizedError") next()
      })

    const schema = await buildSchema({
      authChecker,
      authMode: "null",
      resolvers: [__dirname + resolverPaths],
    })

    const apolloServer = new ApolloServer({
      context: ({ req, res }: { req: IRequest; res: Response }) => ({
        req,
        res,
        userId: req.user && req.user.id,
        userLoader: userLoader(),
        shareLoader: shareLoader(),
      }),
      formatError: formatArgumentValidationError,
      introspection: true,
      playground: true,
      schema,
    })

    apolloServer.applyMiddleware({
      app,
      cors,
    })

    app.listen(PORT, () =>
      console.log(`Server started at http://localhost:${PORT} 🚀`),
    )
  } catch (error) {
    console.log(error)
  }
}

main()
