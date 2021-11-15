import mongoose, { Model } from "mongoose";
import type { FollowType } from "../../types/Follow";

const FollowSchema = new mongoose.Schema<FollowType>({
  fromType: {
    type: String,
    enum: ["User", "Restaurant"],
    required: true,
    index: true,
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "type",
    required: true,
    index: true,
  },
  toType: {
    type: String,
    enum: ["User", "Restaurant"],
    required: true,
    index: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "type",
    required: true,
    index: true,
  },
});

export default (mongoose.models.Follow as Model<FollowType>) ||
  mongoose.model<FollowType>("Follow", FollowSchema);
