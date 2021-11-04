import mongoose, { Model } from "mongoose";
import type { PostType } from "../../types/Post";

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
  tags: {
    type: [String],
    required: true,
    index: true,
    default: [],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now as any,
  },
});

export default (mongoose.models.Post as Model<PostType>) ||
  mongoose.model<PostType>("Post", PostSchema);
