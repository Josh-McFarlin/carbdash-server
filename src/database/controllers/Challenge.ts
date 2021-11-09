import * as mongoose from "mongoose";
import Challenge from "../models/Challenge";
import { ChallengeType } from "../../types/Challenge";

export const createChallenge = async (
  challenge: ChallengeType
): Promise<ChallengeType> => {
  const newChallenge = new Challenge(challenge);

  await newChallenge.save();

  return newChallenge.toJSON() as any;
};

export const findChallengeById = (id: string): Promise<ChallengeType> =>
  Challenge.findById(id).lean().exec();

export const findChallenges = ({
  name,
  user,
  owner,
  perPage = 20,
  page = 0,
}: {
  name?: string;
  user?: string;
  owner?: string;
  perPage?: number;
  page?: number;
}): Promise<ChallengeType[]> =>
  Challenge.find({
    ...(name != null && {
      name: new RegExp(name, "i"),
    }),
    ...(user != null && {
      user: new mongoose.Types.ObjectId(user) as any,
    }),
    ...(owner != null && {
      owner: new mongoose.Types.ObjectId(owner) as any,
    }),
    ...(user == null &&
      owner == null && {
        expiresAt: {
          $lte: new Date(),
        },
      }),
  })
    .sort("-expiresAt")
    .skip(perPage * page)
    .limit(perPage)
    .lean()
    .exec();

export const updateChallengeById = (
  id: string,
  updates: Partial<ChallengeType>
): Promise<ChallengeType> =>
  Challenge.findByIdAndUpdate(id, updates, {
    new: true,
  })
    .lean()
    .exec();

export const deleteChallengeById = (id: string): Promise<ChallengeType> =>
  Challenge.findByIdAndDelete(id).lean().exec();
