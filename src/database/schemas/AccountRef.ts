import mongoose from "mongoose";
import type { AccountRefType } from "../../types/AccountRef";

export const AccountRefSchema = new mongoose.Schema<AccountRefType>({
  type: {
    type: String,
    enum: ["User", "Restaurant"],
    required: true,
    index: true,
  },
  ref: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "type",
    required: true,
  },
});
