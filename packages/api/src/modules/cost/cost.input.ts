import { InputType, Field } from "type-graphql"
import { Cost } from "./cost.entity"
import { ShareInput } from "../share/share.input"

@InputType()
export class CostInput implements Partial<Cost> {
  @Field()
  name: string

  @Field()
  amount: number

  @Field({ nullable: true })
  recurring?: string

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

@InputType()
export class EditCostInput implements Partial<Cost> {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  amount?: number

  @Field({ nullable: true })
  recurring?: string

  @Field({ nullable: true })
  category?: string

  @Field({ nullable: true })
  date?: string

  @Field()
  payerId: string

  @Field(() => [ShareInput])
  costShares: ShareInput[]
}
