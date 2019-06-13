import { Service } from "typedi"
import bcrypt from "bcryptjs"

import { User } from "./user.entity"
import { InviteService } from "../invite/invite.service"

import { LoginInput } from "./inputs/login.input"
import { RegisterInput } from "./inputs/register.input"
import { UpdateInput } from "./inputs/update.input"
import { UserRepository } from "./user.repository"

@Service()
export class UserService {
  constructor(
    private readonly inviteService: InviteService,
    private readonly userRepository: UserRepository,
  ) {}

  async login(data: LoginInput): Promise<User> {
    const user = await this.userRepository.findByEmail(data.email)
    if (!user) throw new Error("Incorrect email or password")
    const isValidPassword = await bcrypt.compare(data.password, user.password)
    if (!isValidPassword) throw new Error("Incorrect email or password")
    return user
  }

  async create(data: RegisterInput): Promise<User> {
    const userExists = await this.userRepository.findByEmail(data.email)
    if (userExists) throw new Error("User with this email already exists")
    const userData = { ...data } as any

    let invite
    if (data.inviteId) {
      invite = await this.inviteService.findById(data.inviteId)
      userData.houseId = invite.houseId
    }

    const user = await User.create(userData).save()
    if (invite) await invite.remove()

    return user
  }

  async update(userId: string, data: UpdateInput): Promise<User> {
    const user = await this.userRepository.findById(userId)
    if (!user) throw new Error("User not found")
    let password = user.password
    if (data.password) {
      password = await bcrypt.hash(data.password, 10)
    }
    Object.assign(user, data, { password })
    await user.save()
    return user
  }
}
