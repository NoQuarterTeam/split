import "reflect-metadata"
import Container, { Service, Inject } from "typedi"
import { CostJob } from "./modules/cost/cost.job"

@Service()
class Workers {
  @Inject()
  costJob: CostJob

  async work() {
    this.costJob.work()
  }
}

Container.get(Workers)
  .work()
  .then(() => console.log("Workers running 🏃"))
  .catch(err => console.log(err.message))
