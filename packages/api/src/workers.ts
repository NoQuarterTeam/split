import "reflect-metadata"
import Container, { Service } from "typedi"
import { CostJob } from "./modules/cost/cost.job"
import { createDbConnection } from "./db"

@Service()
class Workers {
  constructor(private readonly costJob: CostJob) {}
  async work() {
    await createDbConnection()
    await this.costJob.work()
  }
}

Container.get(Workers)
  .work()
  .then(() => console.log("Workers running 🏃"))
  .catch(err => console.log(err.message))
