import type { Schema } from "mongoose";
import { AccountRefType } from "./AccountRef";

export interface PostType {
  _id: string;
  user?: Schema.Types.ObjectId;
  restaurant?: Schema.Types.ObjectId;
  ownerType: "User" | "Restaurant";
  body: string;
  photoUrls: string[];
  category: string;
  tags: string[];
  likedBy: Map<string, AccountRefType>;
  createdAt: Date;
}
