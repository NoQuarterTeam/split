import DataLoader from "dataloader"
import { In } from "typeorm"
import { Share } from "./share.entity"

export const shareLoader = () =>
  new DataLoader(async (keys: string[]) => {
    const shares = await Share.find({
      where: {
        costId: In(keys),
      },
    })
    const qrMap: { [key: string]: Share[] } = {}
    shares.forEach(share => {
      if (share.costId in qrMap) {
        qrMap[share.costId].push(share)
      } else {
        qrMap[share.costId] = [share]
      }
    })

    return keys.map(k => qrMap[k])
  })
