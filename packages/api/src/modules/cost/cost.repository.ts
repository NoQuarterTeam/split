import { Service } from "typedi"

import { AllCostArgs } from "./args/allCost.args"
import { AllCostsResponse } from "./cost.response"
import { GroupRepository } from "../group/group.repository"
import { Cost } from "./cost.entity"

@Service()
export class CostRepository {
  constructor(private readonly groupRepository: GroupRepository) {}

  async findAllAndCount({
    groupId,
    search,
    skip,
  }: AllCostArgs): Promise<AllCostsResponse> {
    const group = await this.groupRepository.findById(groupId)
    const costsAndCount = await Cost.getRepository()
      .createQueryBuilder("cost")
      .where({ group })
      .andWhere("cost.name ilike :search", {
        search: `%${search}%`,
      })
      .take(25)
      .skip(skip)
      .orderBy("cost.date", "DESC")
      .addOrderBy("cost.createdAt", "DESC")
      .getManyAndCount()

    return { costs: costsAndCount[0], count: costsAndCount[1] }
  }

  findById(costId: string): Promise<Cost> {
    return Cost.findOneOrFail(costId)
  }
}
