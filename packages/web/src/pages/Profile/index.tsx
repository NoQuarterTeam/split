import React, { useContext } from "react"
import { AppContext } from "../../application/context"
import Avatar from "../../components/Avatar"

function Profile() {
  const { user } = useContext(AppContext)

  return (
    <div>
      <Avatar user={user!} />
    </div>
  )
}

export default Profile
