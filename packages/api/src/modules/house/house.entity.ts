import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"
import { User } from "../user/user.entity"
import { Cost } from "../cost/cost.entity"

@ObjectType()
@Entity()
export class House extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @Column()
  name: string

  @Field(() => [User])
  @OneToMany(() => User, user => user.house)
  users: User[]

  @Field(() => [Cost])
  @OneToMany(() => Cost, cost => cost.house)
  costs: Cost[]
}
