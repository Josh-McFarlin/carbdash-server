import mongoose, { Model } from "mongoose";
import type { CheckInType } from "../../types/CheckIn";
import { AccountRefSchema } from "../schemas/AccountRef";

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

export default (mongoose.models.CheckIn as Model<CheckInType>) ||
  mongoose.model<CheckInType>("CheckIn", CheckInSchema);
