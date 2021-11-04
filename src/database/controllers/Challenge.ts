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

export const findChallenges = (): Promise<ChallengeType[]> =>
  Challenge.find({
    expiresAt: {
      $lte: new Date(),
    },
  })
    .sort("-expiresAt")
    .lean()
    .exec();

export const findChallengeById = (id: string): Promise<ChallengeType> =>
  Challenge.findById(id).lean().exec();

export const findChallengesByUser = (
  userId: string
): Promise<ChallengeType[]> =>
  Challenge.find({
    completedBy: new mongoose.Types.ObjectId(userId) as any,
  })
    .sort("-expiresAt")
    .lean()
    .exec();

export const findChallengesByName = (
  name: ChallengeType["name"]
): Promise<ChallengeType[]> =>
  Challenge.find({
    name,
  })
    .sort("-expiresAt")
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
