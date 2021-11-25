import mongoose from "mongoose";
import User from "../database/models/User";
import { UserType } from "../types/User";
import { SaveRefType } from "../types/SaveRef";
import { CheckInType } from "../types/CheckIn";
import { PostType } from "../types/Post";
import { ReviewType } from "../types/Review";

export const findSavedById = async (
  authedUserId: string,
  detailed = false,
  filter?: "CheckIn" | "Post" | "Review"
): Promise<(CheckInType | PostType | ReviewType)[] | SaveRefType[]> => {
  const authedUser = await User.findById(authedUserId).lean().exec();

  if (authedUser == null) {
    throw new Error("User not found!");
  }

  if (detailed) {
    return Promise.all(
      Object.values(authedUser?.saved || {})
        .filter((i: SaveRefType) => filter == null || i.type === filter)
        .map((i: SaveRefType) =>
          mongoose.model(i.type).findById(i.ref).lean().exec()
        )
    ) as any;
  } else {
    return filter != null
      ? Object.values(authedUser.saved || {}).filter(
          (i: SaveRefType) => i.type === filter
        )
      : Object.values(authedUser.saved || {});
  }
};

export const toggleSaveById = async (
  authedUserId: string,
  contentType: "CheckIn" | "Post" | "Review",
  content: string
): Promise<UserType> => {
  const authedUser = await User.findById(authedUserId).exec();

  if (authedUser == null) {
    throw new Error("User not found!");
  }

  authedUser.saved.has(contentType + content)
    ? authedUser.saved.delete(contentType + content)
    : authedUser.saved.set(contentType + content, {
        type: contentType,
        ref: new mongoose.Types.ObjectId(content) as any,
      });

  await authedUser.save();

  return authedUser.toJSON() as any;
};
