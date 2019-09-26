import { Entity, Column, ManyToOne } from "typeorm"
import { ObjectType, Field } from "type-graphql"

import { BaseEntity } from "../shared/base.entity"
import { Group } from "../group/group.entity"

@ObjectType()
@Entity()
export class Invite extends BaseEntity {
  @Field()
  @Column({ unique: true })
  email: string

  @Field()
  @Column()
  groupId: string

  @ManyToOne(() => Group, group => group.invites)
  group: Group
}
