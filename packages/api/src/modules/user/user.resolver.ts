import { Resolver, Query, Ctx, Mutation, Arg, Authorized } from "type-graphql"

import { User } from "./user.entity"
import { UserService } from "./user.service"
import { IResolverContext } from "../../lib/types"
import {
  LoginInput,
  RegisterInput,
  UpdateInput,
  InviteUserInput,
} from "./user.input"
import { cookieName } from "../../config"
import { HouseService } from "../house/house.service"
import { UserMailer } from "./user.mailer"

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly userMailer: UserMailer,
    private readonly houseService: HouseService,
  ) {}

  // ME
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: IResolverContext): Promise<User | null> {
    if (!req.session!.userId) return null
    return await this.userService.findById(req.session!.userId)
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
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: IResolverContext): Promise<boolean> {
    await new Promise(res => ctx.req.session!.destroy(() => res()))
    ctx.res.clearCookie(cookieName)
    return true
  }

  // INVITE USER
  @Mutation(() => Boolean)
  async inviteUser(@Arg("data") data: InviteUserInput): Promise<boolean> {
    const house = await this.houseService.findById(data.houseId)
    this.userMailer.sendInvitationLink(data.email, house)
    return true
  }
}
