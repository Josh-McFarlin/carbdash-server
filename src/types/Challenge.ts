import type { Schema } from "mongoose";

export interface ChallengeType {
  _id: string;
  owner: Schema.Types.ObjectId;
  name: string;
  body?: string;
  iconUrl: string;
  score: number;
  completedBy: Schema.Types.ObjectId[];
  createdAt: Date;
  expiresAt: Date;
}
