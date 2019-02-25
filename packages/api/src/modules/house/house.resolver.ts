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

import { IResolverContext } from "../../lib/types"
import { House } from "./house.entity"
import { HouseInput } from "./house.input"
import { HouseService } from "./house.service"
import { Cost } from "../cost/cost.entity"
import { UserService } from "../user/user.service"
import { User } from "../user/user.entity"

@Resolver(() => House)
export class HouseResolver {
  constructor(
    private readonly houseService: HouseService,
    private readonly userService: UserService,
  ) {}

  // Check HOUSE
  @Query(() => House, { nullable: true })
  async checkHouse(
    @Arg("houseId", { nullable: true }) houseId?: string,
  ): Promise<House | null> {
    if (!houseId) return null
    const house = await this.houseService.findById(houseId)
    return house
  }

  // GET HOUSE
  @Authorized()
  @Query(() => House, { nullable: true })
  async house(@Ctx() { userId }: IResolverContext): Promise<House> {
    const user = await this.userService.findById(userId)
    const house = await this.houseService.findById(user.houseId)
    return house
  }

  // CREATE HOUSE
  @Authorized()
  @Mutation(() => House, { nullable: true })
  async createHouse(
    @Arg("data") data: HouseInput,
    @Ctx() { userId }: IResolverContext,
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
}
