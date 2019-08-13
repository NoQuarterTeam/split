import gql from "graphql-tag"

export const Cost = gql`
  fragment Cost on Cost {
    id
    name
    amount
    date
    recurring
    equalSplit
    category
    createdAt
    houseId
    payerId
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

export const Payer = gql`
  fragment Payer on Cost {
    payer {
      id
      firstName
      lastName
      avatar
    }
  }
`
