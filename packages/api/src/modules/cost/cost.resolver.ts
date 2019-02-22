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
import { AllCostsReturn } from "./cost.return"

@Resolver(() => Cost)
export class CostResolver {
  constructor(
    private readonly costService: CostService,
    private readonly userService: UserService,
  ) {}

  // ALL COSTS
  @Authorized()
  @Query(() => AllCostsReturn)
  async allCosts(@Args() args: AllCostArgs): Promise<AllCostsReturn> {
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
  async shares(@Root() cost: Cost): Promise<Share[]> {
    return await Share.find({
      where: { cost },
    })
  }

  @FieldResolver(() => User)
  async payer(@Root() cost: Cost): Promise<User> {
    // TODO:  solve n + 1 with dataloader etc
    return await this.userService.findById(cost.payerId)
  }
}
