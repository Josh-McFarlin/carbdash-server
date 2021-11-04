import * as mongoose from "mongoose";
import CheckIn from "../models/CheckIn";
import { CheckInType } from "../../types/CheckIn";

export const createCheckIn = async (
  checkIn: CheckInType
): Promise<CheckInType> => {
  const newCheckIn = new CheckIn(checkIn);

  await newCheckIn.save();

  return newCheckIn.toJSON() as any;
};

export const findCheckInById = (id: string): Promise<CheckInType> =>
  CheckIn.findById(id).lean().exec();

export const findCheckIns = ({
  user,
  restaurant,
  tags,
}: {
  user?: string;
  restaurant?: string;
  tags?: string[];
}): Promise<CheckInType[]> =>
  CheckIn.find({
    ...(user != null && {
      user: new mongoose.Types.ObjectId(user) as any,
    }),
    ...(restaurant != null && {
      restaurant: new mongoose.Types.ObjectId(restaurant) as any,
    }),
    ...(tags != null && {
      tags,
    }),
  })
    .sort("-createdAt")
    .lean()
    .exec();

export const updateCheckInById = (
  id: string,
  updates: Partial<CheckInType>
): Promise<CheckInType> =>
  CheckIn.findByIdAndUpdate(id, updates, {
    new: true,
  })
    .lean()
    .exec();

export const deleteCheckInById = (id: string): Promise<CheckInType> =>
  CheckIn.findByIdAndDelete(id).lean().exec();
