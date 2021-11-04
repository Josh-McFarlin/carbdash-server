import mongoose, { Model } from "mongoose";
import type { CheckInType } from "../../types/CheckIn";

const CheckInSchema = new mongoose.Schema<CheckInType>({
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
  withUsers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
    default: [],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now as any,
  },
});

export default (mongoose.models.CheckIn as Model<CheckInType>) ||
  mongoose.model<CheckInType>("CheckIn", CheckInSchema);
