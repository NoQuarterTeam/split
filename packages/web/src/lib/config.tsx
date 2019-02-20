export const env = process.env.NODE_ENV || "development"

export const production = env === "production"

export const apiUrl =
  env === "production"
    ? "https://nq-splitme.herokuapp.com/graphql"
    : "http://localhost:5000/graphql"
