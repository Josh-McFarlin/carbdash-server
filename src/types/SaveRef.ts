import { Schema } from "mongoose";

export interface SaveRefType {
  type: "CheckIn" | "Post" | "Review";
  ref: Schema.Types.ObjectId;
}
