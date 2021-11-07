import type { Schema } from "mongoose";

export interface CheckInType {
  _id: string;
  user: Schema.Types.ObjectId;
  restaurant: Schema.Types.ObjectId;
  withUsers: Schema.Types.ObjectId[];
  createdAt: Date;
}
