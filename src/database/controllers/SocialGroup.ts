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
  perPage = 20,
  page = 0,
}: {
  name?: string;
  owner?: string;
  member?: string;
  tags?: string[];
  perPage?: number;
  page?: number;
}): Promise<SocialGroupType[]> =>
  SocialGroup.find({
    ...(name != null && {
      name,
    }),
    ...(owner != null && {
      owner: new mongoose.Types.ObjectId(owner) as any,
    }),
    ...(member != null && {
      members: new mongoose.Types.ObjectId(member) as any,
    }),
    ...(tags != null && {
      tags,
    }),
  })
    .sort("name")
    .skip(perPage * page)
    .limit(perPage)
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
