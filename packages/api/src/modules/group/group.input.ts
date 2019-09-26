import { InputType, Field } from "type-graphql"
import { Group } from "./group.entity"

@InputType()
export class GroupInput implements Partial<Group> {
  @Field()
  name: string

  @Field()
  currency: string
}
