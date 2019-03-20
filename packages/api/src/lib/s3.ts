import { S3 } from "aws-sdk/clients/all"
import { s3Config } from "../config"

// AWS
export const s3 = new S3(s3Config)
