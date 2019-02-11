import { Service } from "typedi"
import Queue, { Job } from "bull"

import { Cost } from "./cost.entity"

export const recurringCost = new Queue(
  "recurringCost",
  process.env.REDIS_URL || "",
)

@Service()
export class CostJob {
  async work() {
    recurringCost.process(async (job: Job) => {
      // Find cost from the job
      const cost = await Cost.findOne(job.data.id, { relations: ["shares"] })
      if (!cost) throw new Error("cost not found")

      // Apply the balance based of the costs shares

      // If cost is recurring, create a cost one-interval in the future and
      // create a job passing in the new cost
    })
  }

  createJob(cost: Cost) {
    // TODO get milliseconds from cost.date - time.now
    recurringCost.add(`cost-${cost.id}-${cost.recurring}`, cost, {
      delay: 10000,
      removeOnComplete: true,
    })
  }

  destroyJob(cost: Cost) {
    // Find job by id? and delete it
  }
}
