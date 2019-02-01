export const env = process.env.NODE_ENV || "development"

export const apiUrl =
  env === "production"
    ? "https://api.split.com/graphql"
    : "http://localhost:5000/graphql"
