import { gql } from "apollo-boost"

export const House = gql`
  fragment House on House {
    id
    name
  }
`
