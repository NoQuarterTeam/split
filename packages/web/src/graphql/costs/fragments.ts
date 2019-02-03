import { gql } from "apollo-boost"

export const Cost = gql`
  fragment Cost on Cost {
    id
    name
    amount
    date
    recurring
    category
    createdAt
    payer {
      id
      firstName
    }
  }
`
