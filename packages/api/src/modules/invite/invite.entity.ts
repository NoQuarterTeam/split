import { Entity, Column, ManyToOne } from "typeorm"
import { ObjectType, Field } from "type-graphql"

import { BaseEntity } from "../shared/base.entity"
import { House } from "../house/house.entity"

@ObjectType()
@Entity()
export class Invite extends BaseEntity {
  @Field()
  @Column({ unique: true })
  email: string

  @Field()
  @Column()
  houseId: string

  @ManyToOne(() => House, house => house.invites)
  house: House
}
