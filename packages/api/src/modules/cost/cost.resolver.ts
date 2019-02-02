import {
  Resolver,
  Ctx,
  Mutation,
  Arg,
  Query,
  FieldResolver,
  Root,
} from "type-graphql"

import { IResolverContext } from "../../lib/types"
import { Cost } from "./cost.entity"
import { CreateCostInput } from "./cost.input"
import { CostService } from "./cost.service"
import { Share } from "../share/share.entity"

@Resolver(() => Cost)
export class CostResolver {
  constructor(private readonly costService: CostService) {}

  // GET ALL COSTS
  @Query(() => [Cost])
  async getAllCosts(@Arg("houseId") houseId: string): Promise<Cost[]> {
    return await this.costService.findAll(houseId)
  }

  // GET COST
  @Query(() => Cost)
  async getCost(@Arg("costId") costId: string): Promise<Cost | null> {
    return await this.costService.find(costId)
  }

  // CREATE COST
  @Mutation(() => Cost)
  async createCost(
    @Arg("data") data: CreateCostInput,
    @Ctx() ctx: IResolverContext,
  ): Promise<Cost> {
    const cost = await this.costService.create(ctx.req.session!.userId, data)
    return cost
  }

  @FieldResolver(() => [Share])
  async shares(@Root() cost: Cost) {
    const costShares = await Share.find({
      where: { cost },
    })
    return costShares
  }
}
