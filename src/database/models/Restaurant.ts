import mongoose, { Model } from "mongoose";
import type { RestaurantType } from "../../types/Restaurant";
import { AddressSchema, PointSchema } from "../schemas/Location";
import { DayAvailabilitySchema } from "../schemas/OpenHours";

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
  createdAt: {
    type: Date,
    required: true,
    default: Date.now as any,
  },
});

export default (mongoose.models.Restaurant as Model<RestaurantType>) ||
  mongoose.model<RestaurantType>("Restaurant", RestaurantSchema);
