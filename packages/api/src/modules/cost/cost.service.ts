import { Service } from "typedi"
import dayjs from "dayjs"
import { CostInput, AllCostArgs } from "./cost.input"
import { Cost } from "./cost.entity"
import { ShareService } from "../share/share.service"
import { CostJob } from "./cost.job"
import { HouseService } from "../house/house.service"
import { ShareInput } from "../share/share.input"
import { AllCostsResponse } from "./cost.response"

@Service()
export class CostService {
  constructor(
    private readonly costJob: CostJob,
    private readonly shareService: ShareService,
    private readonly houseService: HouseService,
  ) {}

  async findAllAndCount({
    houseId,
    search,
    skip,
  }: AllCostArgs): Promise<AllCostsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const house = await this.houseService.findById(houseId)
        const costsAndCount = await Cost.getRepository()
          .createQueryBuilder("cost")
          .where({ house })
          .andWhere("cost.name ilike :search", {
            search: `%${search}%`,
          })
          .take(25)
          .skip(skip)
          .orderBy("cost.date", "DESC")
          .addOrderBy("cost.createdAt", "DESC")
          .getManyAndCount()

        resolve({ costs: costsAndCount[0], count: costsAndCount[1] })
      } catch (error) {
        reject(error)
      }
    })
  }

  findById(costId: string): Promise<Cost> {
    return new Promise(async (resolve, reject) => {
      try {
        const cost = await Cost.findOne(costId)
        if (!cost) throw new Error("find by id not found")
        resolve(cost)
      } catch (error) {
        reject(error)
      }
    })
  }

  create(userId: string, data: CostInput): Promise<Cost> {
    return new Promise(async (resolve, reject) => {
      try {
        // Create cost / shares
        const cost = await Cost.create({ ...data, creatorId: userId }).save()
        await this.shareService.bulkCreate(cost, data.costShares)

        if (dayjs(cost.date).isBefore(dayjs())) {
          // Apply balance if cost is in the past
          await this.shareService.applyBalance(cost)

          // If cost is recurring, create the future cost / shares
          // and create a job that will apply the balance at the future costs date
          if (data.recurring !== "one-off") {
            await this.createFuture(cost, data.costShares)
          }
          resolve(cost)
        } else {
          // Create job that will apply the balance in the future
          await this.costJob.createJob(cost)
          resolve(cost)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  createFuture(cost: Cost, shares: ShareInput[]): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        // Pull off unwanted attributes
        const { id, date, ...data } = cost
        const futureCost = await Cost.create({
          ...data,
          date: dayjs(cost.date)
            .add(1, cost.recurring as "month" | "week")
            .format(),
        }).save()
        await this.shareService.bulkCreate(futureCost, shares)

        // If cost was more than 2x interval in the past, need to recursively
        // create all costs up to now and 1 in the future, this is by design
        if (dayjs(futureCost.date).isBefore(dayjs())) {
          await this.shareService.applyBalance(futureCost)
          await this.createFuture(futureCost, shares)
        } else {
          await this.costJob.createJob(futureCost)
        }
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  update(costId: string, data: CostInput): Promise<Cost> {
    return new Promise(async (resolve, reject) => {
      try {
        const cost = await this.findById(costId)

        if (
          // If cost already paid
          dayjs(cost.date).isBefore(dayjs()) &&
          dayjs(data.date).isBefore(dayjs()) &&
          cost.recurring === data.recurring
        ) {
          // TODO: If just changing name and category, shouldn't need to
          // run all of this

          // Apply balance if cost date is in the past
          await this.shareService.undoBalance(cost)
          await this.shareService.bulkRemove(cost)

          Object.assign(cost, data)

          await cost.save()
          await this.shareService.bulkCreate(cost, data.costShares)
          await this.shareService.applyBalance(cost)
          resolve(cost)
        } else {
          // It is just as efficient to destroy the cost and create a new one
          // than run through the process of updating all the cost/shares/jobs
          // and updating accordingly, I swear it is, I swear...
          const creator = cost.creatorId
          await this.destroy(cost.id)
          const newCost = await this.create(creator, data)
          resolve(newCost)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  destroy(costId: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const cost = await this.findById(costId)
        if (!cost) throw new Error("destroy cost not found")

        if (dayjs(cost.date).isBefore(dayjs())) {
          // Undo balance if already paid
          await this.shareService.undoBalance(cost)
        } else {
          // Remove job if cost in future
          await this.costJob.destroyJob(cost)
        }

        // Remove shares
        await this.shareService.bulkRemove(cost)

        // Remove cost
        await cost.remove()

        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }
}
