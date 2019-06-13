import sendgrid from "@sendgrid/mail"
import sendgridClient from "@sendgrid/client"
import nodemailer, { Transporter } from "nodemailer"

import { SENDGRID_API_KEY, devEmailOptions, isProduction } from "./config"

sendgrid.setApiKey(SENDGRID_API_KEY)
sendgridClient.setApiKey(SENDGRID_API_KEY)

interface MailArgs {
  templateId: string
  to: string
  variables?: any
}

export class Mailer {
  private readonly from: string = "Split Team <noreply@getsplit.co>"
  private devMail: Transporter

  constructor() {
    this.devMail = nodemailer.createTransport(devEmailOptions)
  }

  send(args: MailArgs) {
    const data = {
      from: this.from,
      to: args.to,
      templateId: args.templateId,
      // eslint-disable-next-line
      dynamic_template_data: args.variables,
    }
    try {
      if (isProduction) {
        sendgrid.send(data)
      } else {
        this.sendDev(args)
      }
    } catch (err) {
      console.log(err)
    }
  }

  async sendDev(args: MailArgs) {
    const request = {
      method: "GET",
      url: `/v3/templates/${args.templateId}`,
    }
    const [template] = await sendgridClient.request(request)
    const version = template.body.versions[template.body.versions.length - 1]
    const html = this.interpolateVariables(args.variables, version.html_content)
    const subject = version.subject
    const text = this.interpolateVariables(
      args.variables,
      version.plain_content,
    )
    this.devMail.sendMail({
      to: args.to,
      from: this.from,
      subject,
      html,
      text,
    })
  }

  interpolateVariables(params: any, html: string) {
    let newHtml = html
    if (typeof params === "object") {
      Object.keys(params).forEach(field => {
        const paramKey = `{{ ${field} }}`
        newHtml = newHtml.replace(new RegExp(paramKey, "g"), params[field])
      })
    }
    return newHtml
  }
}
