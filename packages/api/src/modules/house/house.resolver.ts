import {
  Resolver,
  Mutation,
  Arg,
  FieldResolver,
  Root,
  Query,
  Authorized,
} from "type-graphql"

import { CurrentUser } from "../shared/middleware/currentUser"
import { House } from "./house.entity"
import { HouseInput } from "./house.input"
import { HouseService } from "./house.service"
import { Cost } from "../cost/cost.entity"
import { UserRepository } from "../user/user.repository"
import { User } from "../user/user.entity"
import { InviteService } from "../invite/invite.service"
import { Invite } from "../invite/invite.entity"
import { HouseRepository } from "./house.repository"

@Resolver(() => House)
export class HouseResolver {
  constructor(
    private readonly houseService: HouseService,
    private readonly houseRepository: HouseRepository,
    private readonly userRepository: UserRepository,
    private readonly inviteService: InviteService,
  ) {}

  // GET HOUSE
  @Authorized()
  @Query(() => House, { nullable: true })
  async house(@CurrentUser() currentUser: User): Promise<House | null> {
    const foundUser = await this.userRepository.findById(currentUser.id)
    if (!foundUser.houseId) return null
    const house = await this.houseRepository.findById(foundUser.houseId)
    return house
  }

  // CREATE HOUSE
  @Authorized()
  @Mutation(() => House, { nullable: true })
  async createHouse(
    @Arg("data") data: HouseInput,
    @CurrentUser() currentUser: User,
  ): Promise<House> {
    const house = await this.houseService.create(currentUser.id, data)
    return house
  }

  // EDIT HOUSE
  @Authorized()
  @Mutation(() => House, { nullable: true })
  async editHouse(
    @Arg("houseId") houseId: string,
    @Arg("data") data: HouseInput,
  ): Promise<House> {
    const house = await this.houseService.update(houseId, data)
    return house
  }

  // FIELD RESOLVERS

  @FieldResolver(() => [Cost])
  async users(@Root() house: House): Promise<User[]> {
    const users = await this.userRepository.findAll(house)
    return users
  }

  @FieldResolver(() => [Cost])
  async invites(@Root() house: House): Promise<Invite[]> {
    const invites = await this.inviteService.findAll(house)
    return invites
  }
}
