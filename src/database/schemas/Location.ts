import mongoose from "mongoose";
import type { AddressType, LocationType } from "../../types/Location";

export const AddressSchema = new mongoose.Schema<AddressType>({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
  },
  country: {
    type: String,
    required: true,
  },
});

export const PointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

export const LocationSchema = new mongoose.Schema<LocationType>({
  address: {
    type: AddressSchema,
    required: true,
  },
  coordinates: {
    type: PointSchema,
    required: true,
  },
});
