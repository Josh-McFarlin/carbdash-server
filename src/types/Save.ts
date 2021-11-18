import type { Schema } from "mongoose";

export interface SaveType {
  _id: string;
  fromType: "User" | "Restaurant";
  from: Schema.Types.ObjectId;
  contentType: "CheckIn" | "Post" | "Review";
  content: Schema.Types.ObjectId;
}
