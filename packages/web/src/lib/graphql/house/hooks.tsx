import { useQuery } from "react-apollo-hooks"
import { GET_HOUSE } from "./queries"
import { GetHouse } from "../types"

export function useHouseQuery() {
  const { data, error } = useQuery<GetHouse.Query>(GET_HOUSE)
  const house = data!.house!
  return { house, error }
}
