import { GroupInput } from "./group.input"
import { Group } from "./group.entity"
import { UserService } from "../user/user.service"
import { Service } from "typedi"
import { GroupRepository } from "./group.repository"

@Service()
export class GroupService {
  constructor(
    private readonly userService: UserService,
    private readonly groupRepository: GroupRepository,
  ) {}

  async create(userId: string, data: GroupInput): Promise<Group> {
    const group = await Group.create(data).save()
    await this.userService.update(userId, { groupId: group.id })
    return group
  }

  async update(groupId: string, data: GroupInput): Promise<Group> {
    const group = await this.groupRepository.findById(groupId)
    Object.assign(group, data)
    await group.save()
    return group
  }
}
