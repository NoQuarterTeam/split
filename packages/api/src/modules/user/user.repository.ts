import { Service } from "typedi"

import { User } from "./user.entity"
import { House } from "../house/house.entity"

@Service()
export class UserRepository {
  findAll(house: House): Promise<User[]> {
    return User.find({
      where: { house },
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
