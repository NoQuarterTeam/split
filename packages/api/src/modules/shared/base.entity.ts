import {
  BaseEntity as TypeOrmBase,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"

import { Field, ID, ObjectType } from "type-graphql"

@ObjectType()
export abstract class BaseEntity extends TypeOrmBase {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @CreateDateColumn()
  createdAt: string

  @Field()
  @UpdateDateColumn()
  updatedAt: string
}
