import gql from "graphql-tag"

export const Invite = gql`
  fragment Invite on Invite {
    id
    email
  }
`
