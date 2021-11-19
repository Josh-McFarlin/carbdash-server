import type { Schema } from "mongoose";
import type { LocationType } from "./Location";
import { AccountRefType } from "./AccountRef";
import { SaveRefType } from "./SaveRef";

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
  followers: Map<string, AccountRefType>;
  following: Map<string, AccountRefType>;
  saved: Map<string, SaveRefType>;
  createdAt: Date;
}
