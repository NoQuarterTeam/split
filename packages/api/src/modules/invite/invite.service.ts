import { Service } from "typedi"
import { InviteInput } from "./invite.input"
import { Invite } from "./invite.entity"
import { House } from "../house/house.entity"

@Service()
export class InviteService {
  findById(id: string): Promise<Invite> {
    return Invite.findOneOrFail(id)
  }

  findAll(house: House): Promise<Invite[]> {
    return Invite.find({ where: { house } })
  }

  findByEmail(email: string): Promise<Invite | undefined> {
    return Invite.findOne({ where: { email } })
  }

  async create(data: InviteInput, house: House): Promise<Invite> {
    const inviteExists = await this.findByEmail(data.email)
    if (inviteExists) throw new Error("invite already sent to this email")
    const invite = await Invite.create({ email: data.email, house }).save()
    return invite
  }

  async destroy(inviteId: string): Promise<boolean> {
    const invite = await this.findById(inviteId)
    await invite.remove()
    return true
  }
}
