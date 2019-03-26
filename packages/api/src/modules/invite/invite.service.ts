import { Service } from "typedi"
import { InviteInput } from "./invite.input"
import { Invite } from "./invite.entity"
import { House } from "../house/house.entity"

@Service()
export class InviteService {
  findById(id: string): Promise<Invite> {
    return new Promise(async (resolve, reject) => {
      try {
        const invite = await Invite.findOne(id)
        if (!invite) throw new Error("invite not found")
        resolve(invite)
      } catch (error) {
        reject(error)
      }
    })
  }

  findAll(house: House): Promise<Invite[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const invites = await Invite.find({ where: { house } })
        resolve(invites)
      } catch (error) {
        reject(error)
      }
    })
  }

  findByEmail(email: string): Promise<Invite> {
    return new Promise(async (resolve, reject) => {
      try {
        const invite = await Invite.findOne({ where: { email } })
        resolve(invite)
      } catch (error) {
        reject(error)
      }
    })
  }

  create(data: InviteInput, house: House): Promise<Invite> {
    return new Promise(async (resolve, reject) => {
      try {
        const inviteExists = await this.findByEmail(data.email)
        if (inviteExists) throw new Error("invite already sent to this email")
        const invite = await Invite.create({ email: data.email, house }).save()
        resolve(invite)
      } catch (error) {
        reject(error)
      }
    })
  }
}
