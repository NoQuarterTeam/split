import "reflect-metadata"
import { createDbConnection } from "./db"
import { User } from "./modules/user/user.entity"
import { House } from "./modules/house/house.entity"

import Container, { Service } from "typedi"
import { CostService } from "./modules/cost/cost.service"
import { CostInput } from "./modules/cost/cost.input"

@Service()
class Seeds {
  constructor(private readonly costService: CostService) {}
  async create() {
    console.log("Creating seeds 🌱")
    await createDbConnection()
    const house = await House.create({
      name: "Marco Polostraat",
    }).save()
    const user1 = await User.create({
      firstName: "Jack",
      lastName: "Clackett",
      email: "jack@noquarter.co",
      password: "password",
      houseId: house.id,
    }).save()
    const user2 = await User.create({
      firstName: "Dan",
      lastName: "Le Comu",
      email: "dan@noquarter.co",
      password: "password",
      houseId: house.id,
    }).save()
    const user3 = await User.create({
      firstName: "George",
      lastName: "Borg",
      email: "george@noquarter.co",
      password: "password",
      houseId: house.id,
    }).save()

    const data: CostInput = {
      name: "Cost",
      amount: 600,
      recurring: "one-off",
      equalSplit: true,
      category: "drinks",
      date: Date.now().toString(),
      payerId: user1.id,
      costShares: [
        { userId: user1.id, amount: 200 },
        { userId: user2.id, amount: 200 },
        { userId: user3.id, amount: 200 },
      ],
      houseId: house.id,
    }

    let i = 1
    while (i < 15) {
      data.name = "Cost" + i
      data.payerId = user1.id
      await this.costService.create(user1.id, data)
      i += 1
    }

    let j = 15
    while (j < 30) {
      data.name = "Cost" + j
      data.payerId = user2.id
      await this.costService.create(user2.id, data)
      j += 1
    }

    let k = 30
    while (k < 45) {
      data.name = "Cost" + k
      data.payerId = user3.id
      await this.costService.create(user3.id, data)
      k += 1
    }
  }
}

Container.get(Seeds)
  .create()
  .then(() => {
    console.log("Seeds created 🌳")
    process.exit()
  })
  .catch(err => {
    console.log(err.message)
    process.exit()
  })
