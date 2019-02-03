import React, { memo } from "react"
import { User } from "../graphql/types"

type IUserBalance = {
  users: User.Fragment[]
}

function UserBalance({ users }: IUserBalance) {
  return (
    <div>
      {users.map(user => {
        return (
          <div key={user.id}>
            <h4>{user.firstName}</h4>
            <p>{user.balance}</p>
          </div>
        )
      })}
    </div>
  )
}

export default memo(UserBalance)
