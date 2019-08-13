import { ApolloError } from "apollo-boost"
import { navigate } from "@reach/router"

import { useApolloClient } from "@apollo/react-hooks"

interface ErrorProps {
  error: ApolloError
}

function Error({ error }: ErrorProps) {
  const client = useApolloClient()
  if (error.message.includes("Access denied!")) {
    client.resetStore().then(() => navigate("/"))
  }
}

export default Error
