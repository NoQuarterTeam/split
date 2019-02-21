import { Service } from "typedi"
import { mail, webUrl } from "../../config"
import { House } from "../house/house.entity"
import { User } from "./user.entity"

@Service()
export class UserMailer {
  async sendInvitationLink(email: string, house: House) {
    try {
      mail.sendMail({
        to: email,
        from: "Split Team <no-reply@split.co>",
        subject: `You have been invited to join ${house.name}`,
        text:
          "Hey there, you've been invited to a new house, click here to sign up and start splitting",
        html: `Hey there, you've been invited to a new house, click <a href="${webUrl}/register?invite=${
          house.id
        }">here</a> to sign up and start splitting`,
      })
    } catch (err) {
      // fail silently
    }
  }

  async sendResetPasswordLink(user: User, token: string) {
    try {
      mail.sendMail({
        to: user.email,
        from: "Split Team <no-reply@split.co>",
        subject: "Reset password link",
        text:
          "Hey there, you recently requested to reset your forgotton password, click here to reset your password",
        html: `Hey there, you recently requested to reset your forgotton password, click <a href="${webUrl}/reset-password/${token}">here</a> to reset your password`,
      })
    } catch (err) {
      // fail silently
    }
  }
}
