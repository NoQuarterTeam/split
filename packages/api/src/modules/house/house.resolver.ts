import { Resolver, Ctx, Mutation, Arg, Query } from "type-graphql"

import { IResolverContext } from "../../lib/types"
import { House } from "./house.entity"
import { CreateHouseInput } from "./house.input"
import { HouseService } from "./house.service"

@Resolver(() => House)
export class HouseResolver {
  constructor(private readonly houseService: HouseService) {}

  // CREATE HOUSE
  @Mutation(() => House)
  async createHouse(
    @Arg("data") data: CreateHouseInput,
    @Ctx() ctx: IResolverContext,
  ): Promise<House> {
    const house = await this.houseService.create(ctx.req.session!.userId, data)
    return house
  }
}
