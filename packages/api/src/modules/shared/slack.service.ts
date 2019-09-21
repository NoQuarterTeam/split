import { Service } from "typedi"
import { WebAPICallResult } from "@slack/web-api"
import { slack } from "../../lib/slack"
import { splitChannel, isProduction } from "../../lib/config"

@Service()
export class SlackService {
  private readonly channel: string
  constructor() {
    this.channel = splitChannel
  }

  async sendChatMessage(text: string): Promise<WebAPICallResult | void> {
    if (!isProduction) return
    return slack.chat.postMessage({
      channel: this.channel,
      text,
    })
  }
}
