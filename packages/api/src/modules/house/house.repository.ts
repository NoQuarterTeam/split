import { Service } from "typedi"
import { House } from "./house.entity"

@Service()
export class HouseRepository {
  findById(houseId: string): Promise<House> {
    return House.findOneOrFail(houseId)
  }
}
