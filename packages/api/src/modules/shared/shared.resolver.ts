import { Resolver, Authorized, Arg, Mutation } from "type-graphql"
import { S3_BUCKET_NAME } from "../../lib/config"
import { s3 } from "../../lib/s3"

import { S3SignedUrlResponse } from "./responses/s3SignedUrl.response"
import { S3SignedUrlInput } from "./inputs/s3SignedUrl.input"

@Resolver()
export class SharedResolver {
  // GET SIGNED S3 URL
  @Authorized()
  @Mutation(() => S3SignedUrlResponse, { nullable: true })
  async getSignedS3Url(
    @Arg("data")
    data: S3SignedUrlInput,
  ): Promise<S3SignedUrlResponse> {
    const s3Params = {
      Bucket: S3_BUCKET_NAME,
      Key: data.filename,
      Expires: 60,
      ContentType: data.filetype,
      ACL: "public-read",
    }
    const signedRequest = s3.getSignedUrl("putObject", s3Params)
    const url = `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${data.filename}`
    return {
      url,
      signedRequest,
    }
  }
}
