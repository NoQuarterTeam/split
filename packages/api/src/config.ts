import connectRedis from "connect-redis"
import nodemailer from "nodemailer"
import session from "express-session"
import Arena from "bull-arena"
import { redis } from "./redis"

// ENV
export const env = process.env.NODE_ENV || "development"

export const webUrl =
  env === "production" ? "https://splitme.co" : "http://localhost:3000"

// CORS
export const cors = {
  credentials: true,
  origin: [webUrl],
}

// PORT
export const port = process.env.PORT || 5000

// GRAPHQL PATH
export const path = "/graphql"

// RESOLVER PATHS
export const resolverPaths =
  env === "production"
    ? "/modules/**/*.resolver.js"
    : "/modules/**/*.resolver.ts"

// SESSION
const RedisStore = connectRedis(session)
export const cookieName = "split.web.cookie"
export const sessionOptions = {
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 14, // 14 days
    secure: env === "production",
  },
  name: cookieName,
  resave: false,
  saveUninitialized: false,
  secret: process.env.APP_SECRET || "AppSecret",
  store: new RedisStore({ client: redis as any }),
}

// WORKERS UI

export const arena = Arena(
  {
    queues: [{ name: "costWorker", hostId: "split" }],
  },
  {
    basePath: "/arena",
    disableListen: true,
  },
)

// EMAIL

const emailOptions: any = {
  production: {
    host: "smtp.sendgrid.net",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SENDGRID_USERNAME,
      pass: process.env.SENDGRID_PASSWORD,
    },
  },
  development: {
    host: "localhost",
    port: 1025,
    secure: false,
    debug: true,
    ignoreTLS: true,
  },
}

export const mail = nodemailer.createTransport(emailOptions[env])
