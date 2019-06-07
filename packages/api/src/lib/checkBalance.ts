import "reflect-metadata"
import Container, { Service } from "typedi"
import { createDbConnection } from "../db"

import { Cost } from "../modules/cost/cost.entity"
import { User } from "../modules/user/user.entity"

let userList: { [key: string]: { name: string; balance: number } } = {}

@Service()
class CheckBalance {
  async check() {
    await createDbConnection()
    const users = await User.find()

    users.forEach(user => {
      userList[user.id] = { name: user.firstName, balance: 0 }
    })

    const costs = await Cost.find({ relations: ["shares"] })
    costs.forEach(cost => {
      cost.shares.forEach(share => {
        if (cost.payerId === share.userId) {
          userList[share.userId].balance =
            userList[share.userId].balance + (cost.amount - share.amount)
        } else {
          userList[share.userId].balance =
            userList[share.userId].balance - share.amount
        }
      })
    })
    console.log(userList)
  }
}

Container.get(CheckBalance)
  .check()
  .then(() => console.log("Reset running"))
  .catch(err => console.log(err.message))
