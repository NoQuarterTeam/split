import { InputType, Field } from "type-graphql"
import { IsPositive } from "class-validator"
import { Cost } from "../cost.entity"
import { ShareInput } from "../../share/share.input"

@InputType()
export class CostInput implements Partial<Cost> {
  @Field()
  name: string

  @IsPositive()
  @Field()
  amount: number

  @Field()
  recurring: "month" | "week" | "one-off"

  @Field()
  equalSplit: boolean

  @Field()
  category: string

  @Field()
  date: string

  @Field()
  groupId: string

  @Field()
  payerId: string

  @Field(() => [ShareInput])
  costShares: ShareInput[]
}
