import mongoose, { Model } from "mongoose";
import type { UserType } from "../../types/User";
import { LocationSchema } from "../schemas/Location";

const UserSchema = new mongoose.Schema<UserType>({
  auth0Id: {
    type: String,
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  avatarUrl: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
    default: 0,
  },
  locations: {
    type: [LocationSchema],
    required: true,
    default: [],
  },
  groups: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "SocialGroup",
    required: true,
    index: true,
    default: [],
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
    default: [],
  },
  following: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
    default: [],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now as any,
  },
});

export default (mongoose.models.User as Model<UserType>) ||
  mongoose.model<UserType>("User", UserSchema);
