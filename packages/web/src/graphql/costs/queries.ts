import { gql } from "apollo-boost"
import { Cost } from "./fragments"

export const GET_ALL_COSTS = gql`
  query AllCosts($houseId: String!) {
    allCosts(houseId: $houseId) {
      id
      name
      amount
      date
      payer {
        firstName
      }
    }
  }
`

export const GET_COST = gql`
  query GetCost($costId: String!) {
    cost(costId: $costId) {
      ...Cost
    }
  }
  ${Cost}
`

export const CREATE_COST = gql`
  mutation CreateCost($data: CostInput!) {
    createCost(data: $data) {
      id
    }
  }
`

export const EDIT_COST = gql`
  mutation EditCost($costId: String!, $data: CostInput!) {
    editCost(costId: $costId, data: $data) {
      id
    }
  }
`
