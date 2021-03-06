import { Resolver, Arg, Mutation, Authorized, Query } from "type-graphql"

import { Invite } from "./invite.entity"
import { InviteInput } from "./invite.input"
import { InviteService } from "./invite.service"
import { InviteMailer } from "./invite.mailer"
import { Group } from "../group/group.entity"
import { GroupRepository } from "../group/group.repository"

@Resolver(() => Invite)
export class InviteResolver {
  constructor(
    private readonly inviteService: InviteService,
    private readonly inviteMailer: InviteMailer,
    private readonly groupRepository: GroupRepository,
  ) {}

  // CREATE INVITE
  @Authorized()
  @Mutation(() => Invite, { nullable: true })
  async createInvite(@Arg("data") data: InviteInput): Promise<Invite | null> {
    if (!data.groupId) return null
    const group = await this.groupRepository.findById(data.groupId)
    const invite = await this.inviteService.create(data, group)
    this.inviteMailer.sendInvitationLink(data.email, invite, group)
    return invite
  }

  // DESTROY INVITE
  @Authorized()
  @Mutation(() => Boolean, { nullable: true })
  async destroyInvite(@Arg("inviteId") inviteId: string): Promise<boolean> {
    return this.inviteService.destroy(inviteId)
  }

  // CHECK INVITE
  @Query(() => Group, { nullable: true })
  async checkInvite(
    @Arg("inviteId", { nullable: true }) inviteId?: string,
  ): Promise<Group | null> {
    if (!inviteId) return null
    const invite = await this.inviteService.findById(inviteId)
    const group = await this.groupRepository.findById(invite.groupId)
    return group
  }
}
