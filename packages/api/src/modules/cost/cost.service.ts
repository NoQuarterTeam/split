import { Service } from "typedi"

import { CostInput } from "./cost.input"
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
        const costs = await Cost.find({
          where: { house },
          relations: ["payer"],
          order: { createdAt: "DESC" },
        })
        resolve(costs)
      } catch (error) {
        reject(error)
      }
    })
  }

  findById(costId: string): Promise<Cost> {
    return new Promise(async (resolve, reject) => {
      try {
        const cost = await Cost.findOne(costId, { relations: ["payer"] })
        if (!cost) throw new Error("not found")
        resolve(cost)
      } catch (error) {
        reject(error)
      }
    })
  }

  create(userId: string, data: CostInput): Promise<Cost> {
    return new Promise(async (resolve, reject) => {
      try {
        const creator = await this.userService.findById(userId)
        const house = await this.houseSevice.findById(data.houseId)
        const payer = await this.userService.findById(data.payerId)
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

  destroy(costId: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const cost = await Cost.findOne(costId, { relations: ["payer"] })
        if (!cost) throw new Error("cost not found")

        // Clean up and remove old shares
        await this.shareSevice.bulkRemove(cost, cost.payer)
        await cost.remove()

        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  update(costId: string, data: CostInput): Promise<Cost> {
    return new Promise(async (resolve, reject) => {
      try {
        const cost = await Cost.findOne(costId, { relations: ["payer"] })
        if (!cost) throw new Error("cost not found")

        // Clean up and remove old shares
        await this.shareSevice.bulkRemove(cost, cost.payer)

        // Update Cost
        const payer = await this.userService.findById(data.payerId)
        cost.payer = payer
        Object.assign(cost, data)
        await cost.save()

        // Apply new shares
        await this.shareSevice.bulkCreate(cost, data.costShares, payer)

        resolve(cost)
      } catch (error) {
        reject(error)
      }
    })
  }
}
