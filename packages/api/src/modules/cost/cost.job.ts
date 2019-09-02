import { Inject, Service } from "typedi"
import Queue, { Job } from "bull"
import dayjs from "dayjs"
import { Cost } from "./cost.entity"
import { ShareService } from "../share/share.service"
import { CostService } from "./cost.service"
import { REDIS_URL } from "../../lib/config"

export const costWorker = new Queue("costWorker", REDIS_URL)

@Service()
export class CostJob {
  @Inject(() => ShareService)
  shareService: ShareService

  @Inject(() => CostService)
  costService: CostService

  async work() {
    costWorker.process(async (job: Job) => {
      try {
        // Find cost from the job
        const cost = await Cost.findOne(job.data.id, {
          relations: ["shares"],
        })

        if (!cost) throw new Error("cost not found")

        // Apply the balance based of the costs shares
        await this.shareService.applyBalance(cost)

        console.log("Future cost balance applied")

        // If cost is recurring, create the future cost and shares
        // and create a job that will apply the balance at the costs future date
        if (cost.recurring !== "one-off") {
          await this.costService.createFuture(cost, cost.shares)
          console.log("Future cost created")
        }
      } catch (err) {
        // Fail silently, sentry..
        console.log(err)
      }
    })
  }

  async createJob(cost: Cost) {
    try {
      const delay = dayjs(cost.date).diff(dayjs(), "ms")
      await costWorker.add(cost, {
        delay,
        removeOnComplete: true,
      })
    } catch (err) {
      // Fail silently, sentry..
      console.log(err)
    }
  }

  async destroyJob(cost: Cost) {
    try {
      // Find job by cost id and remove it
      const jobs = await costWorker.getDelayed(dayjs(cost.date).millisecond())

      const costJob = jobs.find(job => job.data.id === cost.id)
      if (!costJob) throw new Error("cost job not found")
      await costJob.remove()
    } catch (err) {
      // Fail silently, sentry..
      console.log(err)
    }
  }
}
