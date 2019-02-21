import { gql } from "apollo-boost"
import { Cost, Shares, Payer } from "./fragments"

export const GET_ALL_COSTS = gql`
  query AllCosts($houseId: String!, $skip: Int) {
    allCosts(houseId: $houseId, skip: $skip) {
      ...Cost
      ...Payer
    }
  }
  ${Cost}
  ${Payer}
`

export const GET_COST = gql`
  query GetCost($costId: String!) {
    getCost(costId: $costId) {
      ...Cost
      ...Shares
    }
  }
  ${Cost}
  ${Shares}
`

export const CREATE_COST = gql`
  mutation CreateCost($data: CostInput!) {
    createCost(data: $data) {
      ...Cost
      ...Payer
    }
  }
  ${Cost}
  ${Payer}
`

export const EDIT_COST = gql`
  mutation EditCost($costId: String!, $data: CostInput!) {
    editCost(costId: $costId, data: $data) {
      id
    }
  }
`

export const DESTROY_COST = gql`
  mutation DestroyCost($costId: String!) {
    destroyCost(costId: $costId)
  }
`
