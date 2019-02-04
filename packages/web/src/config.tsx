export const env = process.env.NODE_ENV || "development"

export const apiUrl =
  env === "production"
    ? "http://localhost:5000/graphql"
    : "http://localhost:5000/graphql"
