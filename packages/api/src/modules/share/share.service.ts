import { Service } from "typedi"
import { Share } from "./share.entity"
import { ShareInput } from "./share.input"
import { Cost } from "../cost/cost.entity"

@Service()
export class ShareService {
  bulkCreate(cost: Cost, data: ShareInput[]): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        await Promise.all(
          data.map(async s => await Share.create({ ...s, cost }).save()),
        )
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  bulkRemove(cost: Cost): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const shares = await Share.find({ where: { cost } })
        await Promise.all(shares.map(async share => await share.remove()))
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  applyBalance(cost: Cost): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const shares = await Share.find({ where: { cost }, relations: ["user"] })
      if (shares.length === 0) {
        reject(
          "no shares found, did you try applying a balance before creating the shares?",
        )
      }
      try {
        await Promise.all(
          shares.map(async share => {
            if (share.user.id === cost.payerId) {
              // If user paying, add cost amount ( minus their share ) to
              // their balance
              const payerBalanceDiff = cost.amount - share.amount
              share.user.balance = share.user.balance + payerBalanceDiff
            } else {
              // If user being paid for, subtract their share from
              // their balance
              share.user.balance = share.user.balance - share.amount
            }
            await share.user.save()
          }),
        )
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  undoBalance(cost: Cost): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const shares = await Share.find({ where: { cost }, relations: ["user"] })
      if (shares.length === 0) {
        reject(
          "no shares found, did you try applying a balance after deleting the shares?",
        )
      }
      try {
        await Promise.all(
          shares.map(async share => {
            if (share.user.id === cost.payerId) {
              // If user paying, remove cost amount ( minus their share ) from
              // their balance
              const payerBalanceDiff = cost.amount - share.amount
              share.user.balance = share.user.balance - payerBalanceDiff
            } else {
              // If user being paid for, subtract their share from their
              // balance
              share.user.balance = share.user.balance + share.amount
            }
            await share.user.save()
          }),
        )
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }
}
