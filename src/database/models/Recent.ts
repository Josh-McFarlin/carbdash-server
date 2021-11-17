import mongoose, { Model } from "mongoose";
import type { RecentType } from "../../types/Recent";
import { PointSchema } from "../schemas/Location";

const RecentSchema = new mongoose.Schema<RecentType>({
  type: {
    type: String,
    enum: ["Post", "Review", "CheckIn"],
    required: true,
    index: true,
  },
  data: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "type",
    required: true,
  },
  category: {
    type: String,
    index: true,
  },
  tags: {
    type: [String],
    required: true,
    index: true,
    default: [],
  },
  coordinates: {
    type: PointSchema,
    index: "2dsphere",
  },
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
    default: [],
    index: true,
  },
  restaurants: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Restaurant",
    required: true,
    default: [],
    index: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now as any,
    index: true,
  },
});

export default (mongoose.models.Recent as Model<RecentType>) ||
  mongoose.model<RecentType>("Recent", RecentSchema);
