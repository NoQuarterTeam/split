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
import { HouseService } from "../house/house.service"
import { UserMailer } from "./user.mailer"
import { createToken } from "../../lib/jwt"
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
}
