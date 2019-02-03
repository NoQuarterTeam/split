import React, { memo, useState } from "react"
import { useMutation } from "react-apollo-hooks"
import { CreateHouse } from "../../graphql/types"
import { CREATE_HOUSE } from "../../graphql/house/queries"
import { ME } from "../../graphql/user/queries"
import Button from "../../components/Button"

function NewHouse() {
  const [name, setName] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const createHouse = useMutation<CreateHouse.Mutation, CreateHouse.Variables>(
    CREATE_HOUSE,
    {
      refetchQueries: [{ query: ME }],
    },
  )

  const handleCreateHouseSubmit = (e: any) => {
    e.preventDefault()
    setLoading(true)
    createHouse({ variables: { data: { name } } }).catch(() => {
      setLoading(false)
      setError("error creating house")
    })
  }

  return (
    <div>
      <h2>Start by creating a house</h2>
      <form onSubmit={handleCreateHouseSubmit}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Button loading={loading}>submit</Button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

export default memo(NewHouse)
