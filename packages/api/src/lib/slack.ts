import { WebClient } from "@slack/web-api"
import { SLACK_TOKEN } from "./config"

export const slack = new WebClient(SLACK_TOKEN)
