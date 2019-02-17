import { AuthChecker } from "type-graphql"
import { IResolverContext } from "../lib/types"

export const authChecker: AuthChecker<IResolverContext> = async ({
  context: { req },
}) => {
  if (!req.user || !req.user.id) {
    return false
  } else {
    return true
  }
}
