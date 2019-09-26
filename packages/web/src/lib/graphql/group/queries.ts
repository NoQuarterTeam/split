import gql from "graphql-tag"
import { User } from "../user/fragments"
import { Group } from "./fragments"
import { Invite } from "../invite/fragments"

export const GET_HOUSE = gql`
  query GetGroup {
    group {
      ...Group
      users {
        ...User
      }
      invites {
        ...Invite
      }
    }
  }
  ${Group}
  ${User}
  ${Invite}
`

export const CREATE_HOUSE = gql`
  mutation CreateGroup($data: GroupInput!) {
    createGroup(data: $data) {
      ...Group
      users {
        ...User
      }
      invites {
        ...Invite
      }
    }
  }
  ${Group}
  ${User}
`

export const EDIT_HOUSE = gql`
  mutation EditGroup($groupId: String!, $data: GroupInput!) {
    editGroup(groupId: $groupId, data: $data) {
      ...Group
    }
  }
  ${Group}
`
