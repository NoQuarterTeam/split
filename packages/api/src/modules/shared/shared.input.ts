import { ArgsType, Field, Int, InputType } from "type-graphql"

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 0 })
  skip?: number
}

@InputType()
export class S3SignedUrlInput {
  @Field()
  filename: string

  @Field()
  filetype: string
}
