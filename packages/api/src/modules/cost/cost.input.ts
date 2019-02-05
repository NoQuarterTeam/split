import { InputType, Field } from "type-graphql"
import { Cost } from "./cost.entity"
import { ShareInput } from "../share/share.input"

@InputType()
export class CostInput implements Partial<Cost> {
  @Field()
  name: string

  @Field()
  amount: number

  @Field()
  recurring: string

  @Field()
  category: string

  @Field()
  date: string

  @Field()
  houseId: string

  @Field()
  payerId: string

  @Field(() => [ShareInput])
  costShares: ShareInput[]
}
