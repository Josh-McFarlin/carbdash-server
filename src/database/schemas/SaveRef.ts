import mongoose from "mongoose";
import type { SaveRefType } from "../../types/SaveRef";

export const SaveRefSchema = new mongoose.Schema<SaveRefType>({
  type: {
    type: String,
    enum: ["Post", "Review", "CheckIn"],
    required: true,
    index: true,
  },
  ref: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "type",
    required: true,
  },
});
