import mongoose, { Model } from "mongoose";
import type { SocialGroupType } from "../../types/SocialGroup";

const SocialGroupSchema = new mongoose.Schema<SocialGroupType>({
  name: {
    type: String,
    required: true,
    text: true,
  },
  description: {
    type: String,
    required: true,
  },
  iconUrl: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
    default: [],
  },
  reviews: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Review",
    required: true,
    default: [],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now as any,
  },
});

export default (mongoose.models.SocialGroup as Model<SocialGroupType>) ||
  mongoose.model<SocialGroupType>("SocialGroup", SocialGroupSchema);
