import { Resolver, Authorized, Arg, Mutation } from "type-graphql"
import { s3Bucket, s3 } from "../../config"

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
      Bucket: s3Bucket,
      Key: filename,
      Expires: 60,
      ContentType: filetype,
      ACL: "public-read",
    }
    const signedRequest = await s3.getSignedUrl("putObject", s3Params)
    const url = `https://${s3Bucket}.s3.amazonaws.com/${filename}`
    return {
      url,
      signedRequest,
    }
  }
}
