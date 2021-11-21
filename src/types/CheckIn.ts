import type { Schema } from "mongoose";
import { AccountRefType } from "./AccountRef";

export interface CheckInType {
  _id: string;
  user: Schema.Types.ObjectId;
  restaurant: Schema.Types.ObjectId;
  withUsers: Schema.Types.ObjectId[];
  likedBy: Map<string, AccountRefType>;
  createdAt: Date;
}
