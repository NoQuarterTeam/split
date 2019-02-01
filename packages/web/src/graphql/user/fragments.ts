import { gql } from "apollo-boost"

export const UserInfo = gql`
  fragment UserInfo on User {
    id
    firstName
    lastName
    email
  }
`
