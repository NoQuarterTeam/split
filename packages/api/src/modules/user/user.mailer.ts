import { Service } from "typedi"
import { webUrl, isProduction } from "../../lib/config"
import { House } from "../house/house.entity"
import { User } from "./user.entity"
import { Mailer } from "../../lib/mailer"

@Service()
export class UserMailer {
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

  async sendResetPasswordLink(user: User, token: string) {
    try {
      if (isProduction) {
        this.mailer.send("d-4ec041a37a484a0b84b84efa333acfa5", user.email, {
          buttonUrl: `${webUrl}/reset-password/${token}`,
        })
      } else {
        this.mailer.sendDev({
          to: user.email,
          subject: "Reset password link",
          html: `click <a href="${webUrl}/reset-password/${token}">here</a> to reset your password`,
        })
      }
    } catch (err) {
      // fail silently
    }
  }

  async sendWelcomeEmail(user: User) {
    try {
      if (isProduction) {
        this.mailer.send("d-fcd2fc1f27e74fccaff1fcb3943dec51", user.email, {
          userFirstName: user.firstName,
          buttonUrl: `${webUrl}/new-cost`,
        })
      } else {
        this.mailer.sendDev({
          to: user.email,
          subject: "Welcome",
          html: `click <a href="${webUrl}/new-cost">here</a> to add a cost`,
        })
      }
    } catch (err) {
      // fail silently
    }
  }
}
