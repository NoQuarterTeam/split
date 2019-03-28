import { Entity, Column, OneToMany } from "typeorm"
import { ObjectType, Field } from "type-graphql"

import { SharedEntity } from "../shared/shared.entity"
import { User } from "../user/user.entity"
import { Cost } from "../cost/cost.entity"
import { Invite } from "../invite/invite.entity"

@ObjectType()
@Entity()
export class House extends SharedEntity {
  @Field()
  @Column()
  name: string

  @Field(() => [User])
  @OneToMany(() => User, user => user.house)
  users: User[]

  @Field(() => [Cost])
  @OneToMany(() => Cost, cost => cost.house)
  costs: Cost[]

  @Field(() => [Invite])
  @OneToMany(() => Invite, invite => invite.house)
  invites: Invite[]
}
