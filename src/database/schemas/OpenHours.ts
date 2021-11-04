import mongoose from "mongoose";
import type { DayAvailabilityType } from "../../types/Restaurant";

export const DayAvailabilitySchema = new mongoose.Schema<DayAvailabilityType>({
  startHour: {
    type: Number,
    required: true,
  },
  startMinute: {
    type: Number,
    required: true,
  },
  endHour: {
    type: Number,
    required: true,
  },
  endMinute: {
    type: Number,
    required: true,
  },
});
