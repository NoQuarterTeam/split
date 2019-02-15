export const env = process.env.NODE_ENV || "development"

export const apiUrl =
  env === "production"
    ? "https://nq-splitme.herokuapp.com/"
    : "http://localhost:5000/graphql"
