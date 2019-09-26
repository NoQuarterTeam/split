import { Field, ArgsType } from "type-graphql"
import { PaginationArgs } from "../../shared/args/pagination.args"

@ArgsType()
export class AllCostArgs extends PaginationArgs {
  @Field()
  groupId: string

  @Field({ nullable: true })
  search?: string
}
