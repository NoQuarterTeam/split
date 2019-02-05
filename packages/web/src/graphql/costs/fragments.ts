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
    houseId
    shares {
      user {
        id
      }
      amount
    }
    payer {
      id
      firstName
    }
  }
`
