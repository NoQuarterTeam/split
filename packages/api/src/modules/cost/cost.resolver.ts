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
import { CostInput } from "./cost.input"
import { CostService } from "./cost.service"
import { Share } from "../share/share.entity"

@Resolver(() => Cost)
export class CostResolver {
  constructor(private readonly costService: CostService) {}

  // ALL COSTS
  @Query(() => [Cost])
  async allCosts(@Arg("houseId") houseId: string): Promise<Cost[]> {
    return await this.costService.findAll(houseId)
  }

  // GET COST
  @Query(() => Cost)
  async getCost(@Arg("costId") costId: string): Promise<Cost> {
    return await this.costService.findById(costId)
  }

  // CREATE COST
  @Mutation(() => Cost)
  async createCost(
    @Arg("data") data: CostInput,
    @Ctx() ctx: IResolverContext,
  ): Promise<Cost> {
    return await this.costService.create(ctx.req.session!.userId, data)
  }

  // DESTROY COST
  @Mutation(() => Boolean)
  async destroyCost(@Arg("costId") costId: string): Promise<boolean> {
    return this.costService.destroy(costId)
  }

  // EDIT COST
  @Mutation(() => Cost)
  async editCost(
    @Arg("costId") costId: string,
    @Arg("data") data: CostInput,
  ): Promise<Cost> {
    return await this.costService.update(costId, data)
  }

  // FIELD RESOLVERS

  @FieldResolver(() => [Share])
  async shares(@Root() cost: Cost): Promise<Share[]> {
    return await Share.find({
      where: { cost },
    })
  }
}
