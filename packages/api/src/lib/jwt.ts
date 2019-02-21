import jwt from "jsonwebtoken"

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

export function decryptToken(token: string): Promise<any> {
  return new Promise(resolve => {
    try {
      jwt.verify(token, process.env.APP_SECRET || "supersecret")
      const payload = jwt.decode(token)
      resolve(payload)
    } catch (error) {
      // Oops
    }
  })
}
