import type { Schema } from "mongoose";

export interface SocialGroupType {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  owner: Schema.Types.ObjectId;
  members: Schema.Types.ObjectId[];
  reviews: Schema.Types.ObjectId[];
  createdAt: Date;
}
