import gql from "graphql-tag"

export const Group = gql`
  fragment Group on Group {
    id
    name
    currency
  }
`
