import type { Schema } from "mongoose";

export interface SocialGroupType {
  _id: string;
  name: string;
  description: string;
  tags: string[];
  iconUrl: string;
  owner: Schema.Types.ObjectId;
  members: Schema.Types.ObjectId[];
  reviews: Schema.Types.ObjectId[];
  createdAt: Date;
}
