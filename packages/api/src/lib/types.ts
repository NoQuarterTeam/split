import { Response } from "express"
import { userLoader } from "../modules/user/user.loader"
import { shareLoader } from "../modules/share/share.loader"
import { User } from "../modules/user/user.entity"

export interface ResolverContext {
  req: AppRequest
  res: Response
  userLoader: ReturnType<typeof userLoader>
  shareLoader: ReturnType<typeof shareLoader>
}

interface Session {
  user: User
  destroy(callback: (err: any) => void): void
}

export interface AppRequest {
  session: Session
}
