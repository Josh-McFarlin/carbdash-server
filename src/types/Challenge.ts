import type { Schema } from "mongoose";

export interface ChallengeType {
  id: string;
  title: string;
  body?: string;
  iconUrl: string;
  score: number;
  completedBy: Schema.Types.ObjectId[];
  createdAt: Date;
  expiresAt: Date;
}
