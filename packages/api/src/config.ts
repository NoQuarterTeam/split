import S3 from "aws-sdk/clients/s3"
import nodemailer from "nodemailer"

// ENV
export const env = process.env.NODE_ENV || "development"
export const production = env === "production"

export const webUrl = production
  ? "https://www.getsplit.co"
  : "http://localhost:6969"

// CORS
export const cors = {
  credentials: false,
  origin: "*",
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

// DEV EMAIL
const emailOptions: any = {
  host: "localhost",
  port: 1025,
  secure: false,
  debug: true,
  ignoreTLS: true,
}

export const devMail = nodemailer.createTransport(emailOptions)

// AWS
export const s3 = new S3({
  signatureVersion: "v4",
  region: "eu-central-1",
})

export const s3Bucket = process.env.S3_BUCKET_NAME
