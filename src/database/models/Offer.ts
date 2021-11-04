import mongoose, { Model } from "mongoose";
import type { OfferType } from "../../types/Offer";

const OfferSchema = new mongoose.Schema<OfferType>({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
    index: true,
  },
  photoUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  prompt: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now as any,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: true,
  },
});

export default (mongoose.models.Offer as Model<OfferType>) ||
  mongoose.model<OfferType>("Offer", OfferSchema);
