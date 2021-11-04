import mongoose, { Model } from "mongoose";
import type { ReviewType } from "../../types/Review";

const ReviewSchema = new mongoose.Schema<ReviewType>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
    index: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
    default: [],
  },
  photoUrls: {
    type: [String],
    required: true,
    default: [],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now as any,
  },
});

export default (mongoose.models.Review as Model<ReviewType>) ||
  mongoose.model<ReviewType>("Review", ReviewSchema);
