import { Schema } from "mongoose";

export interface AccountRefType {
  type: "User" | "Restaurant";
  ref: Schema.Types.ObjectId;
}
