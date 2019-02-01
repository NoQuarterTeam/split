import { Resolver, Query, Ctx, Mutation, Arg, Authorized } from "type-graphql"

import { User } from "./user.entity"
import { UserService } from "./user.service"
import { IResolverContext } from "../../lib/types"
import { LoginInput, RegisterInput, UpdateInput } from "./user.input"
import { cookieName } from "../../config"

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // ME
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: IResolverContext): Promise<User | null> {
    if (!req.session!.userId) return null
    return await this.userService.find(req.session!.userId)
  }

  // REGISTER
  @Mutation(() => User)
  async register(
    @Arg("data") data: RegisterInput,
    @Ctx() ctx: IResolverContext,
  ): Promise<User> {
    const user = await this.userService.create(data)
    ctx.req.session!.userId = user.id
    return user
  }

  // LOGIN
  @Mutation(() => User)
  async login(
    @Arg("data") data: LoginInput,
    @Ctx() ctx: IResolverContext,
  ): Promise<User> {
    const user = await this.userService.login(data)
    ctx.req.session!.userId = user.id
    return user
  }

  // UPDATE USER
  @Mutation(() => User)
  async updateUser(
    @Arg("data") data: UpdateInput,
    @Ctx() ctx: IResolverContext,
  ): Promise<User> {
    const user = await this.userService.update(ctx.req.session!.userId, data)
    return user
  }

  // LOGOUT
  @Authorized()
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: IResolverContext): Promise<boolean> {
    await new Promise(res => ctx.req.session!.destroy(() => res()))
    ctx.res.clearCookie(cookieName)
    return true
  }
}
