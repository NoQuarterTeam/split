import { gql } from "apollo-boost"
import { UserInfo } from "./fragments"

export const ME = gql`
  query Me {
    me {
      ...UserInfo
    }
  }
  ${UserInfo}
`

export const LOGIN = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      ...UserInfo
    }
  }
  ${UserInfo}
`

export const REGISTER = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      ...UserInfo
    }
  }
  ${UserInfo}
`

export const UPDATE_USER = gql`
  mutation UpdateUser($data: UpdateInput!) {
    updateUser(data: $data) {
      ...UserInfo
    }
  }
  ${UserInfo}
`

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`
