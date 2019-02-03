import { gql } from "apollo-boost"
import { Cost } from "./fragments"

export const CREATE_COST = gql`
  mutation CreateCost($data: CostInput!) {
    createCost(data: $data) {
      ...Cost
    }
  }
  ${Cost}
`
