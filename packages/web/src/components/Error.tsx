import { ApolloError } from "apollo-boost"
import { navigate } from "@reach/router"
import useAppContext from "../lib/hooks/useAppContext"

interface ErrorProps {
  error: ApolloError
}

function Error({ error }: ErrorProps) {
  const { client } = useAppContext()
  if (error.message.includes("Access denied!")) {
    client.resetStore().then(() => navigate("/"))
  }
}

export default Error
