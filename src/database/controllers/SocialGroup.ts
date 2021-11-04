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

export const findSocialGroupById = (id: string): Promise<SocialGroupType> =>
  SocialGroup.findById(id).lean().exec();

export const findSocialGroups = ({
  name,
  owner,
  member,
  tags,
}): Promise<SocialGroupType[]> =>
  SocialGroup.find({
    name,
    owner: new mongoose.Types.ObjectId(owner) as any,
    members: new mongoose.Types.ObjectId(member) as any,
    tags,
  })
    .sort("name")
    .lean()
    .exec();

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
