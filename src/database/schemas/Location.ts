import mongoose from "mongoose";
import type {
  AddressType,
  CoordinatesType,
  LocationType,
} from "../../types/Location";

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

export const CoordinatesSchema = new mongoose.Schema<CoordinatesType>({
  latitude: Number,
  longitude: Number,
});

export const LocationSchema = new mongoose.Schema<LocationType>({
  address: {
    type: AddressSchema,
    required: true,
  },
  coordinates: {
    type: CoordinatesSchema,
    required: true,
  },
});
