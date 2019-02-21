import { Resolver, Query, Ctx, Mutation, Arg, Authorized } from "type-graphql"

import { User } from "./user.entity"
import { UserService } from "./user.service"
import { IResolverContext } from "../../lib/types"
import {
  LoginInput,
  RegisterInput,
  UpdateInput,
  InviteUserInput,
  ResetPasswordInput,
} from "./user.input"
import { HouseService } from "../house/house.service"
import { UserMailer } from "./user.mailer"
import { createToken, decryptToken } from "../../lib/jwt"
import { UserAuth } from "./user.return"

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
    if (!req.user || !req.user.id) return null
    return await this.userService.findById(req.user.id)
  }

  // REGISTER
  @Mutation(() => UserAuth)
  async register(@Arg("data") data: RegisterInput): Promise<UserAuth> {
    const user = await this.userService.create(data)
    const token = await createToken(user.id)
    return { user, token }
  }

  // LOGIN
  @Mutation(() => UserAuth)
  async login(@Arg("data") data: LoginInput): Promise<UserAuth> {
    const user = await this.userService.login(data)
    const token = await createToken(user.id)
    return { user, token }
  }

  // UPDATE USER
  @Authorized()
  @Mutation(() => User)
  async updateUser(
    @Arg("data") data: UpdateInput,
    @Ctx() { req }: IResolverContext,
  ): Promise<User> {
    const user = await this.userService.update(req.user!.id, data)
    return user
  }

  // LOGOUT
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: IResolverContext): Promise<boolean> {
    return true
  }

  // INVITE USER
  @Authorized()
  @Mutation(() => Boolean)
  async inviteUser(@Arg("data") data: InviteUserInput): Promise<boolean> {
    const house = await this.houseService.findById(data.houseId)
    this.userMailer.sendInvitationLink(data.email, house)
    return true
  }

  // FORGOT PASSWORD
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {
    const user = await this.userService.findByEmail(email)
    if (!user) throw new Error("user not found")
    const token = await createToken(user.id)
    this.userMailer.sendResetPasswordLink(user, token)
    return true
  }

  // RESET PASSWORD
  @Mutation(() => Boolean)
  async resetPassword(@Arg("data")
  {
    token,
    password,
  }: ResetPasswordInput): Promise<boolean> {
    const payload: { id: string } = await decryptToken(token)
    await this.userService.update(payload.id, { password })
    return true
  }
}
