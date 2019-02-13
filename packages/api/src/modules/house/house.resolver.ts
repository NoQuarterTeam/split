import {
  Resolver,
  Ctx,
  Mutation,
  Arg,
  FieldResolver,
  Root,
  Query,
} from "type-graphql"

import { IResolverContext } from "../../lib/types"
import { House } from "./house.entity"
import { HouseInput } from "./house.input"
import { HouseService } from "./house.service"
import { CostService } from "../cost/cost.service"
import { Cost } from "../cost/cost.entity"
import { UserService } from "../user/user.service"
import { User } from "../user/user.entity"

@Resolver(() => House)
export class HouseResolver {
  constructor(
    private readonly houseService: HouseService,
    private readonly userService: UserService,
  ) {}

  // GET HOUSE
  @Query(() => House, { nullable: true })
  async house(@Ctx() ctx: IResolverContext): Promise<House | null> {
    if (!ctx.req.session!.userId) return null
    const user = await this.userService.findById(ctx.req.session!.userId)
    const house = await this.houseService.findById(user.houseId)
    return house
  }

  // CREATE HOUSE
  @Mutation(() => House)
  async createHouse(
    @Arg("data") data: HouseInput,
    @Ctx() ctx: IResolverContext,
  ): Promise<House> {
    const house = await this.houseService.create(ctx.req.session!.userId, data)
    return house
  }

  // FIELD RESOLVERS

  @FieldResolver(() => [Cost])
  async users(@Root() house: House): Promise<User[]> {
    const users = await this.userService.findAll(house)
    return users
  }
}
