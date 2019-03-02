import { ObjectType, Field } from "type-graphql"

@ObjectType()
export class S3SignedUrlResponse {
  @Field()
  url: string

  @Field()
  signedRequest: string
}
