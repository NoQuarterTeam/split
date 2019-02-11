import { Service } from "typedi"
import moment from "moment"
import { CostInput } from "./cost.input"
import { Cost } from "./cost.entity"
import { ShareService } from "../share/share.service"
import { CostJob } from "./cost.job"
import { HouseService } from "../house/house.service"

@Service()
export class CostService {
  constructor(
    private readonly costJob: CostJob,
    private readonly shareSevice: ShareService,
    private readonly houseSevice: HouseService,
  ) {}

  async findAll(houseId: string): Promise<Cost[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const house = await this.houseSevice.findById(houseId)
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
        const cost = await Cost.findOne(costId)
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
        // Create cost and shares
        let cost = await Cost.create({ ...data, creatorId: userId }).save()
        await this.shareSevice.bulkCreate(cost, data.costShares)

        if (
          moment(cost.date)
            .startOf("day")
            .isBefore(moment())
        ) {
          // Apply balance if cost is in the past
          await this.shareSevice.applyBalance(cost)
        } else {
          // If cost is recurring create the future cost and shares to use as
          // reference
          if (cost.recurring !== "one-off") {
            cost = await Cost.create({
              ...data,
              date: moment(data.date)
                .add(1, "month")
                .format("DD-MM-YYYY"),
              creatorId: userId,
            }).save()
            await this.shareSevice.bulkCreate(cost, data.costShares)
          }

          // Create a job that will apply the balance at the costs future date
          await this.costJob.createJob(cost)
        }

        resolve(cost)
      } catch (error) {
        reject(error)
      }
    })
  }

  update(costId: string, data: CostInput): Promise<Cost> {
    return new Promise(async (resolve, reject) => {
      try {
        const cost = await this.findById(costId)
        if (!cost) throw new Error("cost not found")

        // Undo balance then remove shares
        await this.shareSevice.undoBalance(cost)
        await this.shareSevice.bulkRemove(cost)

        // Update Cost
        Object.assign(cost, data)
        await cost.save()

        // Create new shares then apply balance
        await this.shareSevice.bulkCreate(cost, data.costShares)
        await this.shareSevice.applyBalance(cost)

        resolve(cost)
      } catch (error) {
        reject(error)
      }
    })
  }

  destroy(costId: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const cost = await this.findById(costId)
        if (!cost) throw new Error("cost not found")

        // Undo balance then remove shares
        await this.shareSevice.undoBalance(cost)
        await this.shareSevice.bulkRemove(cost)

        // Remove job
        if (cost.recurring !== "one-off") {
          this.costJob.destroyJob(cost)
        }
        await cost.remove()

        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }
}
