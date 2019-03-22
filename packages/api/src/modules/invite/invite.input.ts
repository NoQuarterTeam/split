import { InputType, Field } from "type-graphql"
import { Invite } from "./invite.entity"

@InputType()
export class InviteInput implements Partial<Invite> {
  @Field()
  houseId: string

  @Field()
  email: string
}
