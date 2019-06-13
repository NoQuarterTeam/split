import { createParamDecorator } from "type-graphql"
import { ResolverContext } from "../../../lib/types"

export function CurrentUser() {
  return createParamDecorator<ResolverContext>(
    ({ context }) => context.req.session && context.req.session.user,
  )
}
