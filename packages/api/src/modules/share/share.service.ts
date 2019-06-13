import { Service } from "typedi"
import { Share } from "./share.entity"
import { ShareInput } from "./share.input"
import { Cost } from "../cost/cost.entity"

@Service()
export class ShareService {
  async bulkCreate(cost: Cost, data: ShareInput[]): Promise<boolean> {
    await Promise.all(
      data.map(
        async s =>
          await Share.create({
            amount: s.amount,
            userId: s.userId,
            costId: cost.id,
          }).save(),
      ),
    )
    return true
  }

  async bulkRemove(cost: Cost): Promise<boolean> {
    const shares = await Share.find({ where: { cost } })
    await Promise.all(shares.map(async share => await share.remove()))
    return true
  }

  async applyBalance(cost: Cost): Promise<boolean> {
    const shares = await Share.find({ where: { cost }, relations: ["user"] })
    if (shares.length === 0) {
      throw new Error(
        "No shares found, did you try applying a balance before creating the shares?",
      )
    }
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
    return true
  }

  async undoBalance(cost: Cost): Promise<boolean> {
    const shares = await Share.find({ where: { cost }, relations: ["user"] })
    if (shares.length === 0) {
      throw new Error(
        "no shares found, did you try applying a balance after deleting the shares?",
      )
    }
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
    return true
  }
}
