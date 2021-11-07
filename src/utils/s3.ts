import AWS from "aws-sdk";
import { v4 as uuid } from "uuid";

const s3 = new AWS.S3();

export const createUploadUrl = async (): Promise<string> => {
  const fileId = uuid();
  const signedUrlExpireSeconds = 60 * 2;

  return s3.getSignedUrlPromise("putObject", {
    Bucket: process.env.S3_BUCKET_POSTS,
    Key: `${fileId}.jpg`,
    ContentType: "image/jpeg",
    Expires: signedUrlExpireSeconds,
  });
};
