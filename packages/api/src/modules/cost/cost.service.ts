import { Service } from "typedi"

import { CreateCostInput } from "./cost.input"
import { Cost } from "./cost.entity"
import { UserService } from "../user/user.service"
import { ShareService } from "../share/share.service"
import { House } from "../house/house.entity"
import { HouseService } from "../house/house.service"

@Service()
export class CostService {
  constructor(
    private readonly userService: UserService,
    private readonly shareSevice: ShareService,
    private readonly houseSevice: HouseService,
  ) {}

  async findAll(houseId: string): Promise<Cost[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const house = await House.findOne(houseId)
        if (!house) throw new Error("no house found")
        const costs = await Cost.find({ where: { house } })
        resolve(costs)
      } catch (error) {
        reject(error)
      }
    })
  }

  find(costId: string): Promise<Cost> {
    return new Promise(async (resolve, reject) => {
      try {
        const cost = await Cost.findOne(costId)
        if (!cost) throw new Error("not found")
        resolve(cost)
      } catch (error) {
        reject(error)
      }
    })
  }

  create(userId: string, data: CreateCostInput): Promise<Cost> {
    return new Promise(async (resolve, reject) => {
      try {
        const creator = await this.userService.find(userId)
        const house = await this.houseSevice.find(data.houseId)
        const payer = await this.userService.find(data.payerId)
        const cost = await Cost.create({
          ...data,
          house,
          creator,
          payer,
        }).save()
        await this.shareSevice.bulkCreate(cost, data.costShares, payer)
        resolve(cost)
      } catch (error) {
        reject(error)
      }
    })
  }
}
