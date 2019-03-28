import { Entity, Column, ManyToOne } from "typeorm"
import { SharedEntity } from "../shared/shared.entity"
import { ObjectType, Field } from "type-graphql"
import { House } from "../house/house.entity"

@ObjectType()
@Entity()
export class Invite extends SharedEntity {
  @Field()
  @Column({ unique: true })
  email: string

  @Field()
  @Column()
  houseId: string

  @ManyToOne(() => House, house => house.invites)
  house: House
}
