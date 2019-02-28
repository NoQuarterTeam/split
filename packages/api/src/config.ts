import nodemailer from "nodemailer"

// ENV
export const env = process.env.NODE_ENV || "development"

export const webUrl =
  env === "production" ? "https://www.splitme.co" : "http://localhost:6969"

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
