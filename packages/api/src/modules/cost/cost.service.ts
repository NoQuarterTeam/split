import { Service, Inject } from "typedi"
import dayjs from "dayjs"
import { CostInput } from "./inputs/cost.input"
import { Cost } from "./cost.entity"
import { ShareService } from "../share/share.service"
import { CostJob } from "./cost.job"
import { ShareInput } from "../share/share.input"
import { CostRepository } from "./cost.repository"

@Service()
export class CostService {
  @Inject(() => CostJob)
  costJob: CostJob

  constructor(
    private readonly costRepository: CostRepository,
    private readonly shareService: ShareService,
  ) {}

  async create(userId: string, data: CostInput): Promise<Cost> {
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
      return cost
    } else {
      // Create job that will apply the balance in the future
      await this.costJob.createJob(cost)
      return cost
    }
  }

  async createFuture(cost: Cost, shares: ShareInput[]): Promise<void> {
    // Pull off unwanted attributes
    const { id, date, ...data } = cost // eslint-disable-line
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
  }

  async update(costId: string, data: CostInput): Promise<Cost> {
    const cost = await this.costRepository.findById(costId)

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
      return cost
    } else {
      // It is just as efficient to destroy the cost and create a new one
      // than run through the process of updating all the cost/shares/jobs
      // and updating accordingly, I swear it is, I swear...
      const creator = cost.creatorId
      await this.destroy(cost.id)
      const newCost = await this.create(creator, data)
      return newCost
    }
  }

  async destroy(costId: string): Promise<boolean> {
    const cost = await this.costRepository.findById(costId)
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
    return true
  }
}
