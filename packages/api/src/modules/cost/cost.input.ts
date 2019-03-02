import { InputType, Field, ArgsType } from "type-graphql"
import { Cost } from "./cost.entity"
import { ShareInput } from "../share/share.input"
import { PaginationArgs } from "../shared/shared.input"

@ArgsType()
export class AllCostArgs extends PaginationArgs {
  @Field()
  houseId: string

  @Field({ nullable: true })
  search?: string
}

@InputType()
export class CostInput implements Partial<Cost> {
  @Field()
  name: string

  @Field()
  amount: number

  @Field()
  recurring: "month" | "week" | "one-off"

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
