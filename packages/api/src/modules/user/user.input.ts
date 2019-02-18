import { InputType, Field } from "type-graphql"
import { User } from "./user.entity"

@InputType()
export class UpdateInput implements Partial<User> {
  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  lastName?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  password?: string

  @Field({ nullable: true })
  avatar?: string

  @Field({ nullable: true })
  houseId?: string
}

@InputType()
export class RegisterInput implements Partial<User> {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  email: string

  @Field()
  password: string

  @Field({ nullable: true })
  inviteHouseId?: string
}

@InputType()
export class LoginInput implements Partial<User> {
  @Field()
  email: string

  @Field()
  password: string
}

@InputType()
export class InviteUserInput implements Partial<User> {
  @Field()
  email: string

  @Field()
  houseId: string
}
