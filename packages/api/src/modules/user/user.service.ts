import { Service } from "typedi"
import bcrypt from "bcryptjs"

import { User } from "./user.entity"
import { House } from "../house/house.entity"
import { InviteService } from "../invite/invite.service"

import { LoginInput } from "./inputs/login.input"
import { RegisterInput } from "./inputs/register.input"
import { UpdateInput } from "./inputs/update.input"

@Service()
export class UserService {
  constructor(private readonly inviteService: InviteService) {}

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
        if (userExists) throw new Error("user with this email already exists")
        const userData = { ...data } as any

        let invite
        if (data.inviteId) {
          invite = await this.inviteService.findById(data.inviteId)
          userData.houseId = invite.houseId
        }

        const user = await User.create(userData).save()
        if (invite) await invite.remove()

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
        let password = user.password
        if (data.password) {
          password = await bcrypt.hash(data.password, 10)
        }
        Object.assign(user, data, { password })
        await user.save()
        resolve(user)
      } catch (error) {
        reject(error)
      }
    })
  }
}
