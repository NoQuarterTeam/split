import { Entity, Column, BeforeInsert, ManyToOne, OneToMany } from "typeorm"
import { ObjectType, Field } from "type-graphql"
import bcrypt from "bcryptjs"

import { BaseEntity } from "../shared/base.entity"
import { Group } from "../group/group.entity"
import { Share } from "../share/share.entity"
import { Cost } from "../cost/cost.entity"

@ObjectType()
@Entity()
export class User extends BaseEntity {
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

  @Field({ nullable: true })
  @Column({ nullable: true })
  groupId: string

  @Field(() => Group, { nullable: true })
  @ManyToOne(() => Group, group => group.users)
  group: Group

  @Field(() => [Share])
  @OneToMany(() => Share, share => share.user)
  shares: Share[]

  @Field(() => [Cost])
  @OneToMany(() => Cost, cost => cost.creator)
  costsCreated: Cost[]

  @Field(() => [Cost])
  @OneToMany(() => Cost, cost => cost.payer)
  costsPaid: Cost[]

  @BeforeInsert()
  async beforeInsert() {
    this.password = await this.hashPassword(this.password)
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10)
  }
}
