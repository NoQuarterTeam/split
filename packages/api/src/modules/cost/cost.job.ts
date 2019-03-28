import { Service } from "typedi"
import Queue, { Job } from "bull"
import dayjs from "dayjs"
import { Cost } from "./cost.entity"
import { ShareService } from "../share/share.service"
import { CostService } from "./cost.service"
import { REDIS_URL } from "../../lib/config"

export const costWorker = new Queue("costWorker", REDIS_URL)

@Service()
export class CostJob {
  constructor(
    private readonly shareService: ShareService,
    private readonly costService: CostService,
  ) {}

  async work() {
    costWorker.process(async (job: Job) => {
      return new Promise(async resolve => {
        try {
          // Find cost from the job
          const cost = await Cost.findOne(job.data.id, {
            relations: ["shares"],
          })

          if (!cost) throw new Error("cost not found")

          // Apply the balance based of the costs shares
          await this.shareService.applyBalance(cost)

          // If cost is recurring, create the future cost and shares
          // and create a job that will apply the balance at the costs future date
          if (cost.recurring !== "one-off") {
            await this.costService.createFuture(cost, cost.shares)
          }
          resolve()
        } catch (err) {
          // Fail silently, sentry..
          console.log(err)
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
        resolve()
      } catch (err) {
        // Fail silently, sentry..
        console.log(err)
        resolve()
      }
    })
  }

  async destroyJob(cost: Cost) {
    return new Promise(async resolve => {
      try {
        // Find job by cost id and remove it
        const jobs = await costWorker.getDelayed(dayjs(cost.date).millisecond())
        const costJob = jobs.find(job => job.data.id === cost.id)
        if (!costJob) throw new Error("cost job not found")
        await costJob.remove()
        resolve()
      } catch (err) {
        // Fail silently, sentry..
        console.log(err)
        resolve()
      }
    })
  }
}
