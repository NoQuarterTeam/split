import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"
import { User } from "../user/user.entity"
import { Cost } from "../cost/cost.entity"
import { Invite } from "../invite/invite.entity"

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

  @Field(() => [Invite])
  @OneToMany(() => Invite, invite => invite.house)
  invites: Invite[]

  @Field()
  @CreateDateColumn()
  createdAt: string

  @Field()
  @UpdateDateColumn()
  updatedAt: string
}
