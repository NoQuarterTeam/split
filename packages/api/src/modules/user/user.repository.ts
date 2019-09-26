import { Service } from "typedi"

import { User } from "./user.entity"
import { Group } from "../group/group.entity"

@Service()
export class UserRepository {
  findAll(group: Group): Promise<User[]> {
    return User.find({
      where: { group },
      order: { firstName: "DESC" },
    })
  }

  async findById(userId: string): Promise<User> {
    const user = await User.findOne(userId)
    if (!user) throw new Error("User not found")
    return user
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return User.findOne({ where: { email } })
  }
}
