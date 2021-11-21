import mongoose, { Model } from "mongoose";
import type { PostType } from "../../types/Post";
import { AccountRefSchema } from "../schemas/AccountRef";

const PostSchema = new mongoose.Schema<PostType>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    index: true,
  },
  ownerType: {
    type: String,
    enum: ["User", "Restaurant"],
    default: "User",
    index: true,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photoUrls: {
    type: [String],
    required: true,
    default: [],
  },
  category: {
    type: String,
    required: true,
    index: true,
  },
  tags: {
    type: [String],
    required: true,
    index: true,
    default: [],
  },
  likedBy: {
    type: mongoose.Schema.Types.Map,
    of: AccountRefSchema,
    required: true,
    default: {} as any,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now as any,
  },
});

export default (mongoose.models.Post as Model<PostType>) ||
  mongoose.model<PostType>("Post", PostSchema);
