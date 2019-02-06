import { gql } from "apollo-boost"
import { Cost, Shares } from "./fragments"

export const GET_ALL_COSTS = gql`
  query AllCosts($houseId: String!) {
    allCosts(houseId: $houseId) {
      ...Cost
    }
  }
  ${Cost}
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

export const DESTROY_COST = gql`
  mutation DestroyCost($costId: String!) {
    destroyCost(costId: $costId)
  }
`
