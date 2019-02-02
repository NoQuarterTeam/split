import bcrypt from "bcryptjs"
import { User } from "./user.entity"
import { LoginInput, RegisterInput, UpdateInput } from "./user.input"
import { House } from "../house/house.entity"
import { Service } from "typedi"

@Service()
export class UserService {
  async findById(userId: string): Promise<User> {
    const user = await User.findOne(userId)
    if (!user) throw new Error("user not found")
    return user
  }

  findByEmail(data: LoginInput): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({ where: { email: data.email } })
        if (!user) throw new Error("incorrect email or password")
        const isValidPassword = await bcrypt.compare(
          data.password,
          user.password,
        )
        if (!isValidPassword) throw new Error("incorrect email or password")
        resolve(user)
      } catch (error) {
        reject(error)
      }
    })
  }

  create(data: RegisterInput): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.create(data).save()
        resolve(user)
      } catch (error) {
        reject(error)
      }
    })
  }

  async update(userId: string, data: UpdateInput): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.findById(userId)
        if (!user) throw new Error("user not found")
        Object.assign(user, data)
        await user.save()
        resolve(user)
      } catch (error) {
        reject(error)
      }
    })
  }

  async updateHouse(userId: string, house: House): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.findById(userId)
        if (!user) throw new Error("user not found")
        Object.assign(user, { house })
        await user.save()
        resolve(user)
      } catch (error) {
        reject(error)
      }
    })
  }
}
