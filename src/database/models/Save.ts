import mongoose, { Model } from "mongoose";
import { SaveType } from "../../types/Save";

const SaveSchema = new mongoose.Schema<SaveType>({
  fromType: {
    type: String,
    enum: ["User", "Restaurant"],
    required: true,
    index: true,
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "type",
    required: true,
    index: true,
  },
  contentType: {
    type: String,
    enum: ["CheckIn", "Post", "Review"],
    required: true,
    index: true,
  },
  content: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "contentType",
    required: true,
    index: true,
  },
});

export default (mongoose.models.Save as Model<SaveType>) ||
  mongoose.model<SaveType>("Save", SaveSchema);
