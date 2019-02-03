import { gql } from "apollo-boost"
import { User } from "../user/fragments"

export const GET_HOUSE = gql`
  query GetHouse {
    house {
      id
      name
      users {
        ...User
      }
    }
  }
  ${User}
`

export const CREATE_HOUSE = gql`
  mutation CreateHouse($data: HouseInput!) {
    createHouse(data: $data) {
      name
    }
  }
`
