import gql from "graphql-tag"
import { User } from "../user/fragments"
import { House } from "./fragments"
import { Invite } from "../invite/fragments"

export const GET_HOUSE = gql`
  query GetHouse {
    house {
      ...House
      users {
        ...User
      }
      invites {
        ...Invite
      }
    }
  }
  ${House}
  ${User}
  ${Invite}
`

export const CREATE_HOUSE = gql`
  mutation CreateHouse($data: HouseInput!) {
    createHouse(data: $data) {
      ...House
      users {
        ...User
      }
      invites {
        ...Invite
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
    }
  }
  ${House}
`
