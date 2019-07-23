import { Service } from "typedi"
import { webUrl } from "../../lib/config"
import { User } from "./user.entity"
import { Mailer } from "../../lib/mailer"

@Service()
export class UserMailer {
  constructor(private readonly mailer: Mailer) {}

  async sendResetPasswordLink(user: User, token: string) {
    this.mailer.send({
      templateId: "d-4ec041a37a484a0b84b84efa333acfa5",
      to: user.email,
      variables: {
        buttonUrl: `${webUrl}/reset-password/${token}`,
      },
    })
  }

  async sendWelcomeEmail(user: User) {
    this.mailer.send({
      templateId: "d-fcd2fc1f27e74fccaff1fcb3943dec51",
      to: user.email,
      variables: {
        userFirstName: user.firstName,
        buttonUrl: `${webUrl}/new-cost`,
      },
    })
    this.mailer.send({
      templateId: "d-7590a51ac67f48fd9d3ff8a05147f4a4",
      to: ["jack@noquarter.co", "dan@noquarter.co", "george@noquarter.co"],
      variables: { name: user.firstName + " " + user.lastName },
    })
  }
}
