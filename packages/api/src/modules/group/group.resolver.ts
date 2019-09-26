import {
  Resolver,
  Mutation,
  Arg,
  FieldResolver,
  Root,
  Query,
  Authorized,
} from "type-graphql"

import { CurrentUser } from "../shared/middleware/currentUser"
import { Group } from "./group.entity"
import { GroupInput } from "./group.input"
import { GroupService } from "./group.service"
import { Cost } from "../cost/cost.entity"
import { UserRepository } from "../user/user.repository"
import { User } from "../user/user.entity"
import { InviteService } from "../invite/invite.service"
import { Invite } from "../invite/invite.entity"
import { GroupRepository } from "./group.repository"

@Resolver(() => Group)
export class GroupResolver {
  constructor(
    private readonly groupService: GroupService,
    private readonly groupRepository: GroupRepository,
    private readonly userRepository: UserRepository,
    private readonly inviteService: InviteService,
  ) {}

  // GET HOUSE
  @Authorized()
  @Query(() => Group, { nullable: true })
  async group(@CurrentUser() currentUser: User): Promise<Group | null> {
    const foundUser = await this.userRepository.findById(currentUser.id)
    if (!foundUser.groupId) return null
    const group = await this.groupRepository.findById(foundUser.groupId)
    return group
  }

  // CREATE HOUSE
  @Authorized()
  @Mutation(() => Group, { nullable: true })
  async createGroup(
    @Arg("data") data: GroupInput,
    @CurrentUser() currentUser: User,
  ): Promise<Group> {
    const group = await this.groupService.create(currentUser.id, data)
    return group
  }

  // EDIT HOUSE
  @Authorized()
  @Mutation(() => Group, { nullable: true })
  async editGroup(
    @Arg("groupId") groupId: string,
    @Arg("data") data: GroupInput,
  ): Promise<Group> {
    const group = await this.groupService.update(groupId, data)
    return group
  }

  // FIELD RESOLVERS

  @FieldResolver(() => [Cost])
  async users(@Root() group: Group): Promise<User[]> {
    const users = await this.userRepository.findAll(group)
    return users
  }

  @FieldResolver(() => [Cost])
  async invites(@Root() group: Group): Promise<Invite[]> {
    const invites = await this.inviteService.findAll(group)
    return invites
  }
}
