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

export const findCheckIns = (): Promise<CheckInType[]> =>
  CheckIn.find().sort("-createdAt").lean().exec();

export const findCheckInsByUser = (userId: string): Promise<CheckInType[]> =>
  CheckIn.find({
    user: new mongoose.Types.ObjectId(userId) as any,
  })
    .sort("-createdAt")
    .lean()
    .exec();

export const findCheckInsByRestaurant = (
  restaurantId: string
): Promise<CheckInType[]> =>
  CheckIn.find({
    restaurant: new mongoose.Types.ObjectId(restaurantId) as any,
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
