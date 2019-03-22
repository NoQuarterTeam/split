import gql from "graphql-tag"
import { User } from "./fragments"

export const ME = gql`
  query Me {
    me {
      ...User
    }
  }
  ${User}
`

export const LOGIN = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      user {
        ...User
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

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`

export const RESET_PASSWORD = gql`
  mutation ResetPassword($data: ResetPasswordInput!) {
    resetPassword(data: $data)
  }
`
