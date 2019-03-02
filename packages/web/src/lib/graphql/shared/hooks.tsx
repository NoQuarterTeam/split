import { useMutation } from "react-apollo-hooks"
import { GetSignedS3Url } from "../types"
import { GET_SIGNED_S3_URL } from "./queries"

export function useGetSignedS3UrlMutation() {
  return useMutation<GetSignedS3Url.Mutation, GetSignedS3Url.Variables>(
    GET_SIGNED_S3_URL,
  )
}
