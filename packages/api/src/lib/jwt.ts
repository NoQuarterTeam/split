import jwt from "jsonwebtoken"
import { User } from "../modules/user/user.entity"

export const createToken = (userId: string): Promise<string> => {
  return new Promise(resolve => {
    try {
      const token = jwt.sign(
        { id: userId },
        process.env.APP_SECRET || "supersecret",
        {
          issuer: "@split/api",
          audience: ["@split/app", "@split/web"],
          expiresIn: "2w",
        },
      )
      resolve(token)
    } catch (error) {
      // Oops
    }
  })
}
