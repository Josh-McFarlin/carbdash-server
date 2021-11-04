import mongoose, { Model } from "mongoose";
import type { ChallengeType } from "../../types/Challenge";

const ChallengeSchema = new mongoose.Schema<ChallengeType>({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
    text: true,
  },
  body: {
    type: String,
  },
  iconUrl: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  completedBy: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
    index: true,
    default: [],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now as any,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

export default (mongoose.models.Challenge as Model<ChallengeType>) ||
  mongoose.model<ChallengeType>("Challenge", ChallengeSchema);
