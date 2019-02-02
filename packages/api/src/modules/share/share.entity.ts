import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm"

import { Field, ObjectType, ID } from "type-graphql"
import { User } from "../user/user.entity"
import { Cost } from "../cost/cost.entity"

@ObjectType()
@Entity()
export class Share extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string

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

  @Field()
  @CreateDateColumn()
  createdAt: string

  @Field()
  @UpdateDateColumn()
  updatedAt: string
}
