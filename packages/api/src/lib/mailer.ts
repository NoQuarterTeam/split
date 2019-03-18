import sendgrid from "@sendgrid/mail"
sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "SENDGRID_API_KEY")

export class Mailer {
  public readonly from: string = "Split Team <noreply@getsplit.co>"

  send(templateId: string, to: string, variables: any) {
    const message = {
      from: this.from,
      to,
      templateId,
      dynamic_template_data: variables,
    }
    return sendgrid.send(message)
  }
}
