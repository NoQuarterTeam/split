import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"
import bcrypt from "bcryptjs"

import { House } from "../house/house.entity"
import { Share } from "../share/share.entity"
import { Cost } from "../cost/cost.entity"

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Field()
  @Column()
  firstName: string

  @Field()
  @Column()
  lastName: string

  @Field()
  @Column({ nullable: true, default: 0 })
  balance: number

  @Column({ nullable: true })
  houseId: string

  @Field(() => House, { nullable: true })
  @ManyToOne(() => House, house => house.users)
  house: House

  @Field(() => [Share])
  @OneToMany(() => Share, share => share.user)
  shares: Share[]

  @Field(() => [Cost])
  @OneToMany(() => Cost, cost => cost.creator)
  costsCreated: Cost[]

  @Field(() => [Cost])
  @OneToMany(() => Cost, cost => cost.payer)
  costsPaid: Cost[]

  @Field()
  @CreateDateColumn()
  createdAt: string

  @Field()
  @UpdateDateColumn()
  updatedAt: string

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}
