import gql from "graphql-tag"

export const User = gql`
  fragment User on User {
    id
    firstName
    lastName
    groupId
    email
    balance
    avatar
  }
`
