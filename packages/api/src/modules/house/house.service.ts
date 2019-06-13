import { HouseInput } from "./house.input"
import { House } from "./house.entity"
import { UserService } from "../user/user.service"
import { Service } from "typedi"
import { HouseRepository } from "./house.repository"

@Service()
export class HouseService {
  constructor(
    private readonly userService: UserService,
    private readonly houseRepository: HouseRepository,
  ) {}

  async create(userId: string, data: HouseInput): Promise<House> {
    const house = await House.create(data).save()
    await this.userService.update(userId, { houseId: house.id })
    return house
  }

  async update(houseId: string, data: HouseInput): Promise<House> {
    const house = await this.houseRepository.findById(houseId)
    Object.assign(house, data)
    await house.save()
    return house
  }
}
