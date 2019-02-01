import { AuthChecker } from "type-graphql"
import { IResolverContext } from "../lib/types"

export const authChecker: AuthChecker<IResolverContext> = async ({
  context: { req },
}) => {
  if (req.session!.userId) {
    return true
  } else {
    return false
  }
}
