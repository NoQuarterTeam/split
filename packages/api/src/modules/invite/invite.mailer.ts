import { Service } from "typedi"
import { webUrl, isProduction } from "../../config"
import { House } from "../house/house.entity"
import { Mailer } from "../../lib/mailer"

@Service()
export class InviteMailer {
  constructor(private readonly mailer: Mailer) {}

  async sendInvitationLink(email: string, house: House) {
    try {
      if (isProduction) {
        this.mailer.send("d-679a934498094837b3946fd3abdf1aa4", email, {
          houseName: house.name,
          buttonUrl: `${webUrl}/register?invite=${house.id}`,
        })
      } else {
        this.mailer.sendDev({
          to: email,
          subject: `You have been invited to join ${house.name}`,
          html: `click <a href="${webUrl}/register?invite=${
            house.id
          }">here</a> to sign up and start splitting`,
        })
      }
    } catch (err) {
      // fail silently
    }
  }
}
