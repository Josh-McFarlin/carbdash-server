import type { Schema } from "mongoose";

export interface PostType {
  _id: string;
  user?: Schema.Types.ObjectId;
  restaurant?: Schema.Types.ObjectId;
  ownerType: "User" | "Restaurant";
  body: string;
  photoUrls: string[];
  category: string;
  tags: string[];
  createdAt: Date;
}
