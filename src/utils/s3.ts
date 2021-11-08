import AWS from "aws-sdk";
import { v4 as uuid } from "uuid";
import { PresignedPost } from "aws-sdk/clients/s3";

const s3 = new AWS.S3();

export const createUploadUrl = async (): Promise<{
  fileUrl: string;
  uploadUrl: PresignedPost;
}> => {
  const fileId = uuid();

  const fileUrl = `https://sustainabyte-photos.s3.amazonaws.com/${fileId}.jpg`;
  const uploadUrl = await s3.createPresignedPost({
    Bucket: process.env.S3_BUCKET_POSTS,
    Fields: {
      key: `${fileId}.jpg`,
      contentType: "image/jpeg",
      acl: "public-read",
    },
    Expires: 60,
    Conditions: [
      // max image size: 20MB]
      ["content-length-range", 0, 50000000],
    ],
  });

  return {
    fileUrl,
    uploadUrl,
  };
};
