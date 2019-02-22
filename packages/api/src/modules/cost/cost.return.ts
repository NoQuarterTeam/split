import { Cost } from "./cost.entity"
import { ObjectType, Field } from "type-graphql"

@ObjectType()
export class AllCostsReturn {
  @Field(() => [Cost])
  costs: Cost[]

  @Field()
  count: number
}
