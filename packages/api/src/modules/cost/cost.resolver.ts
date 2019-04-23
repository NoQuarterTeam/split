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

import { ResolverContext } from "../../lib/types"

import { Cost } from "./cost.entity"
import { CostInput } from "./inputs/cost.input"
import { AllCostArgs } from "./args/allCost.args"
import { CostService } from "./cost.service"
import { AllCostsResponse } from "./cost.response"
import { Share } from "../share/share.entity"
import { User } from "../user/user.entity"

@Resolver(() => Cost)
export class CostResolver {
  constructor(private readonly costService: CostService) {}

  // ALL COSTS
  @Authorized()
  @Query(() => AllCostsResponse, { nullable: true })
  allCosts(@Args() args: AllCostArgs): Promise<AllCostsResponse> {
    return this.costService.findAllAndCount(args)
  }

  // GET COST
  @Authorized()
  @Query(() => Cost, { nullable: true })
  getCost(@Arg("costId") costId: string): Promise<Cost> {
    return this.costService.findById(costId)
  }

  // CREATE COST
  @Authorized()
  @Mutation(() => Cost, { nullable: true })
  createCost(
    @Arg("data") data: CostInput,
    @Ctx() { req }: ResolverContext,
  ): Promise<Cost> {
    return this.costService.create(req.session.user.id, data)
  }

  // DESTROY COST
  @Authorized()
  @Mutation(() => Boolean, { nullable: true })
  destroyCost(@Arg("costId") costId: string): Promise<boolean> {
    return this.costService.destroy(costId)
  }

  // EDIT COST
  @Authorized()
  @Mutation(() => Cost, { nullable: true })
  editCost(
    @Arg("costId") costId: string,
    @Arg("data") data: CostInput,
  ): Promise<Cost> {
    return this.costService.update(costId, data)
  }

  // FIELD RESOLVERS

  @FieldResolver(() => [Share])
  shares(
    @Root() cost: Cost,
    @Ctx() { shareLoader }: ResolverContext,
  ): Promise<Share[]> {
    return shareLoader.load(cost.id)
  }

  @FieldResolver(() => User)
  payer(
    @Root() cost: Cost,
    @Ctx() { userLoader }: ResolverContext,
  ): Promise<User> {
    return userLoader.load(cost.payerId)
  }
}
