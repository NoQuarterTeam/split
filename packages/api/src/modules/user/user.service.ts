import bcrypt from "bcryptjs"
import { User } from "./user.entity"
import { LoginInput, RegisterInput, UpdateInput } from "./user.input"
import { House } from "../house/house.entity"
import { Service } from "typedi"

@Service()
export class UserService {
  async findAll(house: House): Promise<User[]> {
    const users = await User.find({
      where: { house },
      order: { firstName: "DESC" },
    })
    return users
  }

  async findById(userId: string): Promise<User> {
    const user = await User.findOne(userId)
    if (!user) throw new Error("user not found")
    return user
  }

  findByEmail(email: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({ where: { email } })
        resolve(user)
      } catch (error) {
        reject(error)
      }
    })
  }

  login(data: LoginInput): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.findByEmail(data.email)
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
        const userExists = await this.findByEmail(data.email)
        if (userExists) throw new Error("user already exists")
        const user = await User.create({
          ...data,
          houseId: data.inviteHouseId,
        }).save()
        resolve(user)
      } catch (error) {
        reject(error)
      }
    })
  }

  update(userId: string, data: UpdateInput): Promise<User> {
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
}
