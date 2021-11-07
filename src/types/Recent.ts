import { PostType } from "./Post";
import { ReviewType } from "./Review";
import { CheckInType } from "./CheckIn";
import { Schema } from "mongoose";
import { CoordinatesType } from "./Location";

export interface RecentType {
  type: "Post" | "Review" | "CheckIn";
  data: PostType | ReviewType | CheckInType;
  tags: string[];
  coordinates?: CoordinatesType;
  users: Schema.Types.ObjectId[];
  restaurants: Schema.Types.ObjectId[];
  createdAt: Date;
}
