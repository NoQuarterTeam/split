import { gql } from "apollo-boost"

export const User = gql`
  fragment User on User {
    id
    firstName
    lastName
    email
    balance
  }
`
