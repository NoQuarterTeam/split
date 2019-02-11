import { Service } from "typedi"
import dayjs from "dayjs"
import { CostInput } from "./cost.input"
import { Cost } from "./cost.entity"
import { ShareService } from "../share/share.service"
import { CostJob } from "./cost.job"
import { HouseService } from "../house/house.service"

@Service()
export class CostService {
  constructor(
    private readonly costJob: CostJob,
    private readonly shareService: ShareService,
    private readonly houseService: HouseService,
  ) {}

  async findAll(houseId: string): Promise<Cost[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const house = await this.houseService.findById(houseId)
        // TODO: remove relation here, add field resolver but solve n + 1
        // with dataloader etc
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
        const cost = await Cost.create({ ...data, creatorId: userId }).save()
        await this.shareService.bulkCreate(cost, data.costShares)

        if (dayjs(cost.date).isBefore(dayjs())) {
          // Apply balance if cost is in the past
          await this.shareService.applyBalance(cost)

          // If cost is recurring create the future cost and shares
          if (data.recurring !== "one-off") {
            const futureCost = await Cost.create({
              ...data,
              date: dayjs(cost.date)
                .add(1, data.recurring)
                .format(),
              creatorId: userId,
            }).save()
            await this.shareService.bulkCreate(cost, data.costShares)
            await this.costJob.createJob(futureCost)
          }
        } else {
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
        await this.shareService.undoBalance(cost)
        await this.shareService.bulkRemove(cost)

        // Update Cost
        Object.assign(cost, data)
        await cost.save()

        // Create new shares then apply balance
        await this.shareService.bulkCreate(cost, data.costShares)
        await this.shareService.applyBalance(cost)

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
        await this.shareService.undoBalance(cost)
        await this.shareService.bulkRemove(cost)

        // Remove job
        if (cost.recurring !== "one-off") {
          await this.costJob.destroyJob(cost)
        }
        await cost.remove()

        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }
}
