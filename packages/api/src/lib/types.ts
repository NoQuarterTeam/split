import { Request, Response } from "express"
import { userLoader } from "../modules/user/user.loader"
import { shareLoader } from "../modules/share/share.loader"

export interface ResolverContext {
  req: AppRequest
  res: Response
  userId: string
  userLoader: ReturnType<typeof userLoader>
  shareLoader: ReturnType<typeof shareLoader>
}

export interface AppRequest extends Request {
  user?: { id: string }
}
