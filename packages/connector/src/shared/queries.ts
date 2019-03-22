import gql from "graphql-tag"

export const GET_SIGNED_S3_URL = gql`
  mutation GetSignedS3Url($data: S3SignedUrlInput!) {
    getSignedS3Url(data: $data) {
      url
      signedRequest
    }
  }
`
