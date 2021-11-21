import type { Schema } from "mongoose";
import { AccountRefType } from "./AccountRef";

export interface ReviewType {
  _id: string;
  user: Schema.Types.ObjectId;
  restaurant: Schema.Types.ObjectId;
  stars: number;
  body: string;
  tags: string[];
  photoUrls: string[];
  likedBy: Map<string, AccountRefType>;
  createdAt: Date;
}

export type ReviewSummaryType = {
  _id: string;
  avgRating: number;
  totalReviews: number;
  stars: [number, number, number, number, number];
  reviews: ReviewType[];
  tags: string[];
};
