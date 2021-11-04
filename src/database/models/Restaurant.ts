import mongoose, { Model } from "mongoose";
import type { RestaurantType } from "../../types/Restaurant";
import { CoordinatesSchema, AddressSchema } from "../schemas/Location";
import { DayAvailabilitySchema } from "../schemas/OpenHours";

const arrayLengthSeven = (arr: unknown[]) => arr.length === 7;

const RestaurantSchema = new mongoose.Schema<RestaurantType>({
  name: {
    type: String,
    required: true,
    text: true,
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
    type: CoordinatesSchema,
    required: true,
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
