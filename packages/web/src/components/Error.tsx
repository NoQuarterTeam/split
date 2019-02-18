import React from "react"
import { useApolloClient } from "react-apollo-hooks"
import { ApolloError } from "apollo-boost"
import { navigate } from "@reach/router"

type ErrorProps = {
  error: ApolloError
}

function Error({ error }: ErrorProps) {
  const client = useApolloClient()
  if (error.message.includes("Access denied!")) {
    client.resetStore().then(() => navigate("/"))
  }

  return <div>Oops, there was an error</div>
}

export default Error
