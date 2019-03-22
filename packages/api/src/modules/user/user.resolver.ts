import { Resolver, Query, Ctx, Mutation, Arg, Authorized } from "type-graphql"

import { User } from "./user.entity"
import { UserService } from "./user.service"
import { IResolverContext } from "../../lib/types"
import {
  LoginInput,
  RegisterInput,
  UpdateInput,
  ResetPasswordInput,
} from "./user.input"

import { UserMailer } from "./user.mailer"
import { createToken, decryptToken } from "../../lib/jwt"
import { UserAuthResponse } from "./user.response"

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly userMailer: UserMailer,
  ) {}

  // ME
  @Authorized()
  @Query(() => User, { nullable: true })
  async me(@Ctx() { userId }: IResolverContext): Promise<User> {
    return await this.userService.findById(userId)
  }

  // REGISTER
  @Mutation(() => UserAuthResponse)
  async register(@Arg("data") data: RegisterInput): Promise<UserAuthResponse> {
    const user = await this.userService.create(data)
    const token = await createToken(user.id)
    this.userMailer.sendWelcomeEmail(user)
    return { user, token }
  }

  // LOGIN
  @Mutation(() => UserAuthResponse)
  async login(@Arg("data") data: LoginInput): Promise<UserAuthResponse> {
    const user = await this.userService.login(data)
    const token = await createToken(user.id)
    return { user, token }
  }

  // UPDATE USER
  @Authorized()
  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg("data") data: UpdateInput,
    @Ctx() { userId }: IResolverContext,
  ): Promise<User> {
    return this.userService.update(userId, data)
  }

  // LOGOUT
  @Mutation(() => Boolean)
  async logout(): Promise<boolean> {
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
