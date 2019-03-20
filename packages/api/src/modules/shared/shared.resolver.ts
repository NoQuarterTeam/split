import { Resolver, Authorized, Arg, Mutation } from "type-graphql"
import { S3_BUCKET_NAME } from "../../config"
import { s3 } from "../../lib/s3"

import { S3SignedUrlResponse } from "./shared.response"
import { S3SignedUrlInput } from "./shared.input"

@Resolver()
export class SharedResolver {
  // GET SIGNED S3 URL
  @Authorized()
  @Mutation(() => S3SignedUrlResponse, { nullable: true })
  async getSignedS3Url(@Arg("data")
  {
    filename,
    filetype,
  }: S3SignedUrlInput): Promise<S3SignedUrlResponse> {
    const s3Params = {
      Bucket: S3_BUCKET_NAME,
      Key: filename,
      Expires: 60,
      ContentType: filetype,
      ACL: "public-read",
    }
    const signedRequest = await s3.getSignedUrl("putObject", s3Params)
    const url = `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${filename}`
    return {
      url,
      signedRequest,
    }
  }
}
