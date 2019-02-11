import connectRedis from "connect-redis"
import session from "express-session"
import Arena from "bull-arena"
import { redis } from "./redis"

// ENV
export const env = process.env.NODE_ENV || "development"

// CORS
export const cors = {
  credentials: true,
  origin: env === "production" ? "https://split.com" : "http://localhost:3000",
}

// PORT
export const port = process.env.PORT || 5000

// GRAPHQL PATH
export const path = "/graphql"

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
    queues: [{ name: "recurringCost", hostId: "split" }],
  },
  {
    basePath: "/arena",
    disableListen: true,
  },
)
