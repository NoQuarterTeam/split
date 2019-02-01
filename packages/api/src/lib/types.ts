import { Request, Response } from "express"
import { User } from "../modules/user/user.entity"

export interface IResolverContext {
  req: IRequest
  res: Response
}

interface IRequest extends Request {
  user: User
}
