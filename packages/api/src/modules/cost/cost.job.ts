import { Service } from "typedi"
import Queue, { Job } from "bull"
import dayjs from "dayjs"
import { Cost } from "./cost.entity"
import { ShareService } from "../share/share.service"

export const costWorker = new Queue("costWorker", process.env.REDIS_URL || "")

@Service()
export class CostJob {
  constructor(private readonly shareService: ShareService) {}

  async work() {
    costWorker.process(async (job: Job) => {
      return new Promise(async resolve => {
        try {
          // Find cost from the job
          const cost = await Cost.findOne(job.data.id, {
            relations: ["shares"],
          })

          if (!cost) return // Fail silently, sentry..

          // Apply the balance based of the costs shares
          await this.shareService.applyBalance(cost)

          // If cost is recurring, create a cost one-interval in the future and
          // create a job passing in the new cost
          if (cost.recurring !== "one-off") {
            const newCost = await Cost.create({
              ...cost,
              date: dayjs(cost.date)
                .add(1, cost.recurring)
                .format(),
            }).save()
            await this.shareService.bulkCreate(newCost, cost.shares)
            await this.createJob(newCost)
          }
          resolve()
        } catch (err) {
          console.log(err)
          // Sentry
          resolve()
        }
      })
    })
  }

  async createJob(cost: Cost) {
    return new Promise(async resolve => {
      try {
        const delay = dayjs(cost.date).diff(dayjs(), "ms")
        await costWorker.add(cost, {
          delay,
          removeOnComplete: true,
        })
      } catch (err) {
        console.log(err)
        // Sentry
        resolve()
      }
    })
  }

  async destroyJob(cost: Cost) {
    return new Promise(async resolve => {
      try {
        // Find job by cost id and remove it
        const jobs = await costWorker.getDelayed()
        const costJob = jobs.find(job => job.data.id === cost.id)
        if (!costJob) return // Fail silently, sentry ...
        await costJob.remove()
        resolve()
      } catch (err) {
        console.log(err)
        // Sentry
        resolve()
      }
    })
  }
}
