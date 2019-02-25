import { HouseInput } from "./house.input"
import { House } from "./house.entity"
import { UserService } from "../user/user.service"
import { Service } from "typedi"

@Service()
export class HouseService {
  constructor(private readonly userService: UserService) {}

  findById(houseId: string): Promise<House> {
    return new Promise(async (resolve, reject) => {
      try {
        const house = await House.findOne(houseId)
        if (!house) throw new Error("house not found")
        resolve(house)
      } catch (error) {
        reject(error)
      }
    })
  }

  create(userId: string, data: HouseInput): Promise<House> {
    return new Promise(async (resolve, reject) => {
      try {
        const house = await House.create(data).save()
        await this.userService.update(userId, { houseId: house.id })
        resolve(house)
      } catch (error) {
        reject(error)
      }
    })
  }

  update(houseId: string, data: HouseInput): Promise<House> {
    return new Promise(async (resolve, reject) => {
      try {
        const house = await this.findById(houseId)
        Object.assign(house, data)
        await house.save()
        resolve(house)
      } catch (error) {
        reject(error)
      }
    })
  }
}
