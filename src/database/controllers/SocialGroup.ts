import * as mongoose from "mongoose";
import SocialGroup from "../models/SocialGroup";
import { SocialGroupType } from "../../types/SocialGroup";

export const createSocialGroup = async (
  socialGroup: SocialGroupType
): Promise<SocialGroupType> => {
  const newSocialGroup = new SocialGroup(socialGroup);

  await newSocialGroup.save();

  return newSocialGroup.toJSON() as any;
};

export const findSocialGroups = (): Promise<SocialGroupType[]> =>
  SocialGroup.find().sort("name").lean().exec();

export const findSocialGroupById = (id: string): Promise<SocialGroupType> =>
  SocialGroup.findById(id).lean().exec();

export const findSocialGroupsByOwner = (
  userId: string
): Promise<SocialGroupType[]> =>
  SocialGroup.find({
    owner: new mongoose.Types.ObjectId(userId) as any,
  })
    .sort("name")
    .lean()
    .exec();

export const findSocialGroupsByMember = (
  userId: string
): Promise<SocialGroupType[]> =>
  SocialGroup.find({
    members: new mongoose.Types.ObjectId(userId) as any,
  })
    .sort("name")
    .lean()
    .exec();

export const findSocialGroupsByName = (
  name: SocialGroupType["name"]
): Promise<SocialGroupType[]> =>
  SocialGroup.find({ name }).sort("name").lean().exec();

export const updateSocialGroupById = (
  id: string,
  updates: Partial<SocialGroupType>
): Promise<SocialGroupType> =>
  SocialGroup.findByIdAndUpdate(id, updates, {
    new: true,
  })
    .lean()
    .exec();

export const deleteSocialGroupById = (id: string): Promise<SocialGroupType> =>
  SocialGroup.findByIdAndDelete(id).lean().exec();
