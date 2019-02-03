import { gql } from "apollo-boost"
import { User } from "./fragments"

export const ME = gql`
  query Me {
    me {
      ...User
      house {
        id
        name
      }
    }
  }
  ${User}
`

export const LOGIN = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      ...User
      house {
        id
        name
      }
    }
  }
  ${User}
`

export const REGISTER = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      ...User
      house {
        id
        name
      }
    }
  }
  ${User}
`

export const UPDATE_USER = gql`
  mutation UpdateUser($data: UpdateInput!) {
    updateUser(data: $data) {
      ...User
      house {
        id
        name
      }
    }
  }
  ${User}
`

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`
