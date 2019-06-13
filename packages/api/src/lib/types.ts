import { Response, Request } from "express"
import { userLoader } from "../modules/user/user.loader"
import { shareLoader } from "../modules/share/share.loader"

export interface ResolverContext {
  req: Request
  res: Response
  userLoader: ReturnType<typeof userLoader>
  shareLoader: ReturnType<typeof shareLoader>
}
