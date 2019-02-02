import { Service } from "typedi"
import { Share } from "./share.entity"
import { ShareInput } from "./share.input"
import { Cost } from "../cost/cost.entity"
import { User } from "../user/user.entity"

@Service()
export class ShareService {
  bulkCreate(cost: Cost, data: ShareInput[], payer: User): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await User.findByIds(data.map(s => s.userId))

        await Promise.all(
          data.map(async s => {
            const share = await Share.create({
              amount: s.amount,
              user: users.find(u => u.id === s.userId),
              cost,
            }).save()
            if (share.user.id !== payer.id) {
              // If user being paid for subtract their share
              share.user.balance = share.user.balance - s.amount
            } else {
              // If user paying, add cost amount minus their share
              const payerBalanceDiff = cost.amount - s.amount
              share.user.balance = share.user.balance + payerBalanceDiff
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
