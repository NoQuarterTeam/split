import { Resolver, Arg, Mutation, Authorized, Query } from "type-graphql"

import { Invite } from "./invite.entity"
import { InviteInput } from "./invite.input"
import { InviteService } from "./invite.service"
import { InviteMailer } from "./invite.mailer"
import { HouseService } from "../house/house.service"
import { House } from "../house/house.entity"

@Resolver(() => Invite)
export class InviteResolver {
  constructor(
    private readonly inviteService: InviteService,
    private readonly inviteMailer: InviteMailer,
    private readonly houseService: HouseService,
  ) {}

  // CREATE INVITE
  @Authorized()
  @Mutation(() => Invite, { nullable: true })
  async createInvite(@Arg("data") data: InviteInput): Promise<Invite | null> {
    if (!data.houseId) return null
    const house = await this.houseService.findById(data.houseId)
    const invite = await this.inviteService.create(data, house)
    this.inviteMailer.sendInvitationLink(data.email, invite, house)
    return invite
  }

  // CHECK INVITE
  @Query(() => House, { nullable: true })
  async checkInvite(
    @Arg("inviteId", { nullable: true }) inviteId?: string,
  ): Promise<House | null> {
    if (!inviteId) return null
    const invite = await this.inviteService.findById(inviteId)
    const house = await this.houseService.findById(invite.houseId)
    return house
  }
}
