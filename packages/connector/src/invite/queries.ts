import gql from "graphql-tag"
import { Invite } from "./fragments"

export const CREATE_INVITE = gql`
  mutation CreateInvite($data: InviteInput!) {
    createInvite(data: $data) {
      ...Invite
    }
  }
  ${Invite}
`
