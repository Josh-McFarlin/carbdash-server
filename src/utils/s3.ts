import AWS from "aws-sdk";
import { v4 as uuid } from "uuid";
import { PresignedPost } from "aws-sdk/clients/s3";
import mime from "mime";

const s3 = new AWS.S3();

export const createUploadUrl = async (
  contentType: string
): Promise<{
  fileUrl: string;
  uploadUrl: PresignedPost;
}> => {
  if (contentType == null || !contentType.startsWith("image/")) {
    throw new Error("Invalid content-type provided!");
  }

  const fileId = uuid();
  const extension = mime.getExtension(contentType);

  const fileUrl = `https://sustainabyte-photos.s3.amazonaws.com/${fileId}.${extension}`;
  const uploadUrl = await s3.createPresignedPost({
    Bucket: process.env.S3_BUCKET_POSTS,
    Fields: {
      key: `${fileId}.${extension}`,
      contentType,
      acl: "public-read",
    },
    Expires: 60,
    Conditions: [["content-length-range", 0, 50000000]],
  });

  return {
    fileUrl,
    uploadUrl,
  };
};
