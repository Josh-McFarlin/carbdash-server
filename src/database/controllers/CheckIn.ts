import * as mongoose from "mongoose";
import CheckIn from "../models/CheckIn";
import { CheckInType } from "../../types/CheckIn";
import Restaurant from "../models/Restaurant";
import Recent from "../models/Recent";

export const createCheckIn = async (
  checkIn: CheckInType
): Promise<CheckInType> => {
  const newCheckIn = new CheckIn(checkIn);
  await newCheckIn.save();

  const rest = await Restaurant.findById(newCheckIn.restaurant).lean().exec();

  const newRecent = new Recent({
    type: "CheckIn",
    data: newCheckIn._id,
    coordinates: rest.coordinates,
    users: [newCheckIn.user, ...newCheckIn.withUsers],
    restaurants: [newCheckIn.restaurant],
  });
  await newRecent.save();

  return newCheckIn.toJSON() as any;
};

export const findCheckInById = (id: string): Promise<CheckInType> =>
  CheckIn.findById(id).lean().exec();

export const findCheckIns = ({
  user,
  restaurant,
  tags,
  perPage = 20,
  page = 0,
}: {
  user?: string;
  restaurant?: string;
  tags?: string[];
  perPage?: number;
  page?: number;
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
    .skip(perPage * page)
    .limit(perPage)
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
