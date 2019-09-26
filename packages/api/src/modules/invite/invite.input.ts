import { InputType, Field } from "type-graphql"
import { Invite } from "./invite.entity"

@InputType()
export class InviteInput implements Partial<Invite> {
  @Field()
  groupId: string

  @Field()
  email: string
}
