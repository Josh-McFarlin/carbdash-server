import type { Schema } from "mongoose";

export interface ReviewType {
  id: string;
  user: Schema.Types.ObjectId;
  restaurant: Schema.Types.ObjectId;
  stars: number;
  body: string;
  tags: string[];
  photoUrls: string[];
  createdAt: Date;
}
