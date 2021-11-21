import mongoose from "mongoose";
import CheckIn from "../database/models/CheckIn";
import Post from "../database/models/Post";
import Review from "../database/models/Review";
import { CheckInType } from "../types/CheckIn";
import { PostType } from "../types/Post";
import { ReviewType } from "../types/Review";

export const toggleLikeById = async (
  authedUserId: string,
  contentType: "CheckIn" | "Post" | "Review",
  contentId: string
): Promise<CheckInType | PostType | ReviewType> => {
  if (authedUserId == null) {
    throw new Error("User not found!");
  }

  const content =
    contentType === "CheckIn"
      ? await CheckIn.findById(contentId).exec()
      : contentType === "Post"
      ? await Post.findById(contentId).exec()
      : await Review.findById(contentId).exec();

  if (content == null) {
    throw new Error("User or content not found!");
  }

  if (content.likedBy.has("User" + authedUserId)) {
    content.likedBy.delete("User" + authedUserId);
  } else {
    content.likedBy.set("User" + authedUserId, {
      type: "User",
      ref: new mongoose.Types.ObjectId(authedUserId) as any,
    });
  }

  await content.save();

  return content.toJSON() as any;
};
