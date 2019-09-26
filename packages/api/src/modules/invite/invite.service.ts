import { Service } from "typedi"
import { InviteInput } from "./invite.input"
import { Invite } from "./invite.entity"
import { Group } from "../group/group.entity"

@Service()
export class InviteService {
  findById(id: string): Promise<Invite> {
    return Invite.findOneOrFail(id)
  }

  findAll(group: Group): Promise<Invite[]> {
    return Invite.find({ where: { group } })
  }

  findByEmail(email: string): Promise<Invite | undefined> {
    return Invite.findOne({ where: { email } })
  }

  async create(data: InviteInput, group: Group): Promise<Invite> {
    const inviteExists = await this.findByEmail(data.email)
    if (inviteExists) throw new Error("invite already sent to this email")
    const invite = await Invite.create({ email: data.email, group }).save()
    return invite
  }

  async destroy(inviteId: string): Promise<boolean> {
    const invite = await this.findById(inviteId)
    await invite.remove()
    return true
  }
}
