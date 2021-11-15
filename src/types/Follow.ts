import type { Schema } from "mongoose";

export interface FollowType {
  _id: string;
  fromType: "User" | "Restaurant";
  from: Schema.Types.ObjectId;
  toType: "User" | "Restaurant";
  to: Schema.Types.ObjectId;
}
