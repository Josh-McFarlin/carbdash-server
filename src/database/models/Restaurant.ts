import mongoose, { Model } from "mongoose";
import type { RestaurantType } from "../../types/Restaurant";
import { AddressSchema, PointSchema } from "../schemas/Location";
import { DayAvailabilitySchema } from "../schemas/OpenHours";
import { AccountRefSchema } from "../schemas/AccountRef";

const arrayLengthSeven = (arr: unknown[]) => arr.length === 7;

const RestaurantSchema = new mongoose.Schema<RestaurantType>({
  auth0Id: {
    type: String,
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
    text: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    required: true,
  },
  headerUrl: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  category: {
    type: String,
    required: true,
    index: true,
  },
  tags: {
    type: [String],
    required: true,
    default: [],
    index: true,
  },
  openHours: {
    type: [[DayAvailabilitySchema]],
    required: true,
    default: [[], [], [], [], [], [], []],
    validate: [arrayLengthSeven, "{PATH} does not meet the length of 7!"],
  },
  address: {
    type: AddressSchema,
    required: true,
  },
  coordinates: {
    type: PointSchema,
    required: true,
    index: "2dsphere",
  },
  website: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  ratings: {
    count: Number,
    sum: Number,
    default: {
      count: 0,
      sum: 0,
    },
  },
  menuPercents: {
    type: Map as unknown as Record<string, number>,
    of: Number,
    default: {},
    required: true,
  },
  followers: {
    type: mongoose.Schema.Types.Map,
    of: AccountRefSchema,
    required: true,
    default: {} as any,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now as any,
  },
});

export default (mongoose.models.Restaurant as Model<RestaurantType>) ||
  mongoose.model<RestaurantType>("Restaurant", RestaurantSchema);
