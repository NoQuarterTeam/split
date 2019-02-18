import { Request, Response } from "express"

export interface IResolverContext {
  req: IRequest
  res: Response
}

interface IRequest extends Request {
  user?: { id: string }
}
