import { InputType, Field } from "type-graphql"
import { Share } from "./share.entity"

@InputType()
export class ShareInput implements Partial<Share> {
  @Field()
  userId: string

  @Field()
  amount: number
}
