import type { Schema } from "mongoose";

export interface CheckInType {
  id: string;
  user: Schema.Types.ObjectId;
  restaurant: Schema.Types.ObjectId;
  withUsers: Schema.Types.ObjectId[];
  createdAt: Date;
}
