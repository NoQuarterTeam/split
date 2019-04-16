import { Field, InputType } from "type-graphql"

@InputType()
export class S3SignedUrlInput {
  @Field()
  filename: string

  @Field()
  filetype: string
}
