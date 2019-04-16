import { Entity, Column, OneToMany, ManyToOne } from "typeorm"
import { ObjectType, Field } from "type-graphql"

import { BaseEntity } from "../shared/base.entity"
import { Share } from "../share/share.entity"
import { User } from "../user/user.entity"
import { House } from "../house/house.entity"

@ObjectType()
@Entity()
export class Cost extends BaseEntity {
  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  recurring: "month" | "week" | "one-off"

  @Field()
  @Column({ default: true })
  equalSplit: boolean

  @Field()
  @Column()
  category: string

  @Field()
  @Column()
  amount: number

  @Field()
  @Column()
  date: string

  @Field()
  @Column()
  houseId: string

  @Field()
  @Column()
  payerId: string

  @Field()
  @Column()
  creatorId: string

  @OneToMany(() => Share, share => share.cost)
  shares: Share[]

  @Field(() => House)
  @ManyToOne(() => House, house => house.costs)
  house: House

  @Field(() => User)
  @ManyToOne(() => User, user => user.costsPaid)
  payer: User

  @Field(() => User)
  @ManyToOne(() => User, user => user.costsCreated)
  creator: User
}
