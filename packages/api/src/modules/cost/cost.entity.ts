import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"
import { Share } from "../share/share.entity"
import { User } from "../user/user.entity"
import { House } from "../house/house.entity"

@ObjectType()
@Entity()
export class Cost extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string

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

  @Field()
  @CreateDateColumn()
  createdAt: string

  @Field()
  @UpdateDateColumn()
  updatedAt: string
}
