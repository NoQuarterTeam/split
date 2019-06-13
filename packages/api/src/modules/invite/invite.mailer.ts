import { Service } from "typedi"
import { webUrl } from "../../lib/config"
import { Mailer } from "../../lib/mailer"

import { House } from "../house/house.entity"
import { Invite } from "./invite.entity"

@Service()
export class InviteMailer {
  constructor(private readonly mailer: Mailer) {}

  async sendInvitationLink(email: string, invite: Invite, house: House) {
    this.mailer.send({
      templateId: "d-679a934498094837b3946fd3abdf1aa4",
      to: email,
      variables: {
        houseName: house.name,
        buttonUrl: `${webUrl}/register/${invite.id}`,
      },
    })
  }
}
