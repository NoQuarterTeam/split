import { gql } from "apollo-boost"
import { User } from "./fragments"

export const ME = gql`
  query Me {
    me {
      ...User
      houseId
    }
  }
  ${User}
`

export const LOGIN = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      user {
        ...User
        houseId
      }
      token
    }
  }
  ${User}
`

export const REGISTER = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      user {
        ...User
        houseId
      }
      token
    }
  }
  ${User}
`

export const UPDATE_USER = gql`
  mutation UpdateUser($data: UpdateInput!) {
    updateUser(data: $data) {
      ...User
      houseId
    }
  }
  ${User}
`

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`

export const INVITE_USER = gql`
  mutation InviteUser($data: InviteUserInput!) {
    inviteUser(data: $data)
  }
`
