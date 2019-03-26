import {
  Resolver,
  Ctx,
  Mutation,
  Arg,
  FieldResolver,
  Root,
  Query,
  Authorized,
} from "type-graphql"

import { ResolverContext } from "../../lib/types"
import { House } from "./house.entity"
import { HouseInput } from "./house.input"
import { HouseService } from "./house.service"
import { Cost } from "../cost/cost.entity"
import { UserService } from "../user/user.service"
import { User } from "../user/user.entity"
import { InviteService } from "../invite/invite.service"
import { Invite } from "../invite/invite.entity"

@Resolver(() => House)
export class HouseResolver {
  constructor(
    private readonly houseService: HouseService,
    private readonly userService: UserService,
    private readonly inviteService: InviteService,
  ) {}

  // GET HOUSE
  @Authorized()
  @Query(() => House, { nullable: true })
  async house(@Ctx() { userId }: ResolverContext): Promise<House | null> {
    const user = await this.userService.findById(userId)
    if (!user.houseId) return null
    const house = await this.houseService.findById(user.houseId)
    return house
  }

  // CREATE HOUSE
  @Authorized()
  @Mutation(() => House, { nullable: true })
  async createHouse(
    @Arg("data") data: HouseInput,
    @Ctx() { userId }: ResolverContext,
  ): Promise<House> {
    const house = await this.houseService.create(userId, data)
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
    const users = await this.userService.findAll(house)
    return users
  }

  @FieldResolver(() => [Cost])
  async invites(@Root() house: House): Promise<Invite[]> {
    const invites = await this.inviteService.findAll(house)
    return invites
  }
}
