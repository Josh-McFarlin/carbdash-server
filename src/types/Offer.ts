import type { Schema } from "mongoose";
import { CoordinatesType } from "./Location";

export interface OfferType {
  id: string;
  restaurant: Schema.Types.ObjectId;
  coordinates: CoordinatesType;
  photoUrl: string;
  title: string;
  body: string;
  prompt?: string;
  createdAt: Date;
  expiresAt: Date;
}
