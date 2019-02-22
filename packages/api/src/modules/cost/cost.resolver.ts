import {
  Resolver,
  Ctx,
  Mutation,
  Arg,
  Query,
  FieldResolver,
  Root,
  Authorized,
  Args,
} from "type-graphql"

import { IResolverContext } from "../../lib/types"
import { Cost } from "./cost.entity"
import { CostInput, AllCostArgs } from "./cost.input"
import { CostService } from "./cost.service"
import { Share } from "../share/share.entity"
import { User } from "../user/user.entity"
import { UserService } from "../user/user.service"
import { AllCostsResponse } from "./cost.response"

@Resolver(() => Cost)
export class CostResolver {
  constructor(private readonly costService: CostService) {}

  // ALL COSTS
  @Authorized()
  @Query(() => AllCostsResponse)
  async allCosts(@Args() args: AllCostArgs): Promise<AllCostsResponse> {
    return await this.costService.findAllAndCount(args)
  }

  // GET COST
  @Authorized()
  @Query(() => Cost)
  async getCost(@Arg("costId") costId: string): Promise<Cost> {
    return await this.costService.findById(costId)
  }

  // CREATE COST
  @Authorized()
  @Mutation(() => Cost)
  async createCost(
    @Arg("data") data: CostInput,
    @Ctx() { req }: IResolverContext,
  ): Promise<Cost> {
    return await this.costService.create(req.user!.id, data)
  }

  // DESTROY COST
  @Authorized()
  @Mutation(() => Boolean)
  async destroyCost(@Arg("costId") costId: string): Promise<boolean> {
    return this.costService.destroy(costId)
  }

  // EDIT COST
  @Authorized()
  @Mutation(() => Cost)
  async editCost(
    @Arg("costId") costId: string,
    @Arg("data") data: CostInput,
  ): Promise<Cost> {
    return await this.costService.update(costId, data)
  }

  // FIELD RESOLVERS

  @FieldResolver(() => [Share])
  shares(
    @Root() cost: Cost,
    @Ctx() { shareLoader }: IResolverContext,
  ): Promise<Share[]> {
    return shareLoader.load(cost.id)
  }

  @FieldResolver(() => User)
  payer(
    @Root() cost: Cost,
    @Ctx() { userLoader }: IResolverContext,
  ): Promise<User> {
    return userLoader.load(cost.payerId)
  }
}
