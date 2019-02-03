import { InputType, Field } from "type-graphql"
import { House } from "./house.entity"

@InputType()
export class HouseInput implements Partial<House> {
  @Field()
  name: string
}
