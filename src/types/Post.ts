import type { Schema } from "mongoose";

export interface PostType {
  id: string;
  user?: Schema.Types.ObjectId;
  restaurant?: Schema.Types.ObjectId;
  ownerType: "User" | "Restaurant";
  body: string;
  photoUrls: string[];
  tags: string[];
  createdAt: Date;
}
