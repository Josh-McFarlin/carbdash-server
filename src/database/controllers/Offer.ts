import * as mongoose from "mongoose";
import Offer from "../models/Offer";
import { OfferType } from "../../types/Offer";

export const createOffer = async (offer: OfferType): Promise<OfferType> => {
  const newOffer = new Offer(offer);

  await newOffer.save();

  return newOffer.toJSON() as any;
};

export const findOfferById = (id: string): Promise<OfferType> =>
  Offer.findById(id).lean().exec();

export const findOffers = ({
  restaurant,
  perPage = 20,
  page = 0,
}: {
  restaurant?: string;
  perPage?: number;
  page?: number;
}): Promise<OfferType[]> =>
  Offer.find({
    ...(restaurant != null && {
      restaurant: new mongoose.Types.ObjectId(restaurant) as any,
    }),
    expiresAt: {
      $lte: new Date(),
    },
  })
    .sort("-expiresAt")
    .skip(perPage * page)
    .limit(perPage)
    .lean()
    .exec();

export const updateOfferById = (
  id: string,
  updates: Partial<OfferType>
): Promise<OfferType> =>
  Offer.findByIdAndUpdate(id, updates, {
    new: true,
  })
    .lean()
    .exec();

export const deleteOfferById = (id: string): Promise<OfferType> =>
  Offer.findByIdAndDelete(id).lean().exec();
