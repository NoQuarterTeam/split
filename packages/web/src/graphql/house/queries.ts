import { gql } from "apollo-boost"
import { User } from "../user/fragments"
import { House } from "./fragments"

export const GET_HOUSE = gql`
  query GetHouse {
    house {
      ...House
      users {
        ...User
      }
    }
  }
  ${House}
  ${User}
`

export const CREATE_HOUSE = gql`
  mutation CreateHouse($data: HouseInput!) {
    createHouse(data: $data) {
      ...House
      users {
        ...User
      }
    }
  }
  ${House}
  ${User}
`

export const EDIT_HOUSE = gql`
  mutation EditHouse($houseId: String!, $data: HouseInput!) {
    editHouse(houseId: $houseId, data: $data) {
      ...House
      users {
        ...User
      }
    }
  }
  ${House}
  ${User}
`
