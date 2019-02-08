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
    payer {
      id
      firstName
      lastName
      avatar
    }
  }
`

export const Shares = gql`
  fragment Shares on Cost {
    shares {
      user {
        id
      }
      amount
    }
  }
`
