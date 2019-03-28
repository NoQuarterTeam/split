import sendgrid from "@sendgrid/mail"
import nodemailer from "nodemailer"

import { SENDGRID_API_KEY, devEmailOptions } from "./config"

sendgrid.setApiKey(SENDGRID_API_KEY)

export class Mailer {
  private readonly from: string = "Split Team <noreply@getsplit.co>"
  private devMail: any

  constructor() {
    this.devMail = nodemailer.createTransport(devEmailOptions)
  }

  sendDev(args: any) {
    this.devMail.sendMail({ ...args, from: this.from })
  }

  send(templateId: string, to: string, variables: any) {
    const message = {
      from: this.from,
      to,
      templateId,
      // eslint-disable-next-line
      dynamic_template_data: variables,
    }
    return sendgrid.send(message)
  }
}
