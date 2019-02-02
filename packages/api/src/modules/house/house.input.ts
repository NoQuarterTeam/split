import { InputType, Field } from "type-graphql"
import { House } from "./house.entity"

@InputType()
export class CreateHouseInput implements Partial<House> {
  @Field()
  name: string
}
