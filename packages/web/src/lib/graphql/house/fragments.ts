import gql from "graphql-tag"

export const House = gql`
  fragment House on House {
    id
    name
    currency
  }
`
