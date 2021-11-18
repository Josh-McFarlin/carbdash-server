import type { Schema } from "mongoose";
import type { LocationType } from "./Location";

export interface UserType {
  _id: string;
  auth0Id: string;
  name: string;
  email: string;
  username: string;
  avatarUrl: string;
  bio?: string;
  score: number;
  locations: LocationType[];
  groups: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  following: Schema.Types.ObjectId[];
  createdAt: Date;
}
