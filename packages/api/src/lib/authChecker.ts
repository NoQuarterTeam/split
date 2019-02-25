import { AuthChecker } from "type-graphql"
import { IResolverContext } from "../lib/types"

export const authChecker: AuthChecker<IResolverContext> = async ({
  context: { userId },
}) => {
  if (!userId) {
    return false
  } else {
    return true
  }
}
