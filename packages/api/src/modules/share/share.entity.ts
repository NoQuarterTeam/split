import { Entity, Column, ManyToOne } from "typeorm"
import { Field, ObjectType } from "type-graphql"

import { BaseEntity } from "../shared/base.entity"
import { User } from "../user/user.entity"
import { Cost } from "../cost/cost.entity"

@ObjectType()
@Entity()
export class Share extends BaseEntity {
  @Field()
  @Column()
  amount: number

  @Column()
  costId: string

  @Column()
  userId: string

  @Field(() => User)
  @ManyToOne(() => User, user => user.shares, { eager: true })
  user: User

  @Field(() => Cost)
  @ManyToOne(() => Cost, cost => cost.shares)
  cost: Cost
}
