import type { Schema } from "mongoose";

export interface OfferType {
  id: string;
  restaurant: Schema.Types.ObjectId;
  photoUrl: string;
  title: string;
  body: string;
  prompt?: string;
  createdAt: Date;
  expiresAt: Date;
}
