import gql from "graphql-tag"
import { Invite } from "./fragments"
import { House } from "../house/fragments"

export const CREATE_INVITE = gql`
  mutation CreateInvite($data: InviteInput!) {
    createInvite(data: $data) {
      ...Invite
    }
  }
  ${Invite}
`

export const CHECK_INVITE = gql`
  query CheckInvite($inviteId: String) {
    checkInvite(inviteId: $inviteId) {
      ...House
    }
  }
  ${House}
`
