import { Entity, Column, OneToMany } from "typeorm"
import { ObjectType, Field } from "type-graphql"

import { BaseEntity } from "../shared/base.entity"
import { User } from "../user/user.entity"
import { Cost } from "../cost/cost.entity"
import { Invite } from "../invite/invite.entity"

@ObjectType()
@Entity()
export class Group extends BaseEntity {
  @Field()
  @Column()
  name: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  currency?: string

  @Field(() => [User])
  @OneToMany(() => User, user => user.group)
  users: User[]

  @Field(() => [Cost])
  @OneToMany(() => Cost, cost => cost.group)
  costs: Cost[]

  @Field(() => [Invite])
  @OneToMany(() => Invite, invite => invite.group)
  invites: Invite[]
}
