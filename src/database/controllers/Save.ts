import * as mongoose from "mongoose";
import Save from "../models/Save";
import { SaveType } from "../../types/Save";

export const createSave = async (save: SaveType): Promise<SaveType> => {
  const newSave = new Save(save);

  await newSave.save();

  return newSave.toJSON() as any;
};

export const findSaves = ({
  fromType,
  from,
  contentType,
  content,
  perPage = 20,
  page = 0,
}: {
  fromType?: "User" | "Restaurant";
  from?: string;
  contentType?: "CheckIn" | "Post" | "Review";
  content?: string;
  perPage?: number;
  page?: number;
}): Promise<SaveType[]> =>
  Save.find({
    ...(fromType != null && {
      fromType: fromType,
    }),
    ...(from != null && {
      from: new mongoose.Types.ObjectId(from) as any,
    }),
    ...(contentType != null && {
      contentType: contentType,
    }),
    ...(content != null && {
      content: new mongoose.Types.ObjectId(content) as any,
    }),
  })
    .skip(perPage * page)
    .limit(perPage)
    .lean()
    .exec();

export const deleteSaveById = (id: string): Promise<SaveType> =>
  Save.findByIdAndDelete(id).lean().exec();
