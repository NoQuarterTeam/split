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
  BeforeUpdate,
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

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar: string

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
  async beforeInsert() {
    this.password = await this.hashPassword(this.password)
  }

  @BeforeUpdate()
  async beforeUpdate() {
    this.password = await this.hashPassword(this.password)
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10)
  }
}
