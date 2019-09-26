import { Service } from "typedi"
import { Group } from "./group.entity"

@Service()
export class GroupRepository {
  findById(groupId: string): Promise<Group> {
    return Group.findOneOrFail(groupId)
  }
}
