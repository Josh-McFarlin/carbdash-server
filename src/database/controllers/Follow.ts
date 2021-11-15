import * as mongoose from "mongoose";
import Follow from "../models/Follow";
import { FollowType } from "../../types/Follow";

export const createFollow = async (follow: FollowType): Promise<FollowType> => {
  const newFollow = new Follow(follow);

  await newFollow.save();

  return newFollow.toJSON() as any;
};

export const findFollows = ({
  from,
  to,
  perPage = 20,
  page = 0,
}: {
  from?: string;
  to?: string;
  perPage?: number;
  page?: number;
}): Promise<FollowType[]> =>
  Follow.find({
    ...(from != null && {
      from: new mongoose.Types.ObjectId(from) as any,
    }),
    ...(to != null && {
      to: new mongoose.Types.ObjectId(to) as any,
    }),
  })
    .skip(perPage * page)
    .limit(perPage)
    .lean()
    .exec();

export const deleteFollowById = (id: string): Promise<FollowType> =>
  Follow.findByIdAndDelete(id).lean().exec();
