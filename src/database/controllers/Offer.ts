import * as mongoose from "mongoose";
import Offer from "../models/Offer";
import { OfferType } from "../../types/Offer";

export const createOffer = async (offer: OfferType): Promise<OfferType> => {
  const newOffer = new Offer(offer);

  await newOffer.save();

  return newOffer.toJSON() as any;
};

export const findOffers = (): Promise<OfferType[]> =>
  Offer.find({
    expiresAt: {
      $lte: new Date(),
    },
  })
    .sort("-expiresAt")
    .lean()
    .exec();

export const findOfferById = (id: string): Promise<OfferType> =>
  Offer.findById(id).lean().exec();

export const findOffersByRestaurant = (
  restaurantId: string
): Promise<OfferType[]> =>
  Offer.find({
    restaurant: new mongoose.Types.ObjectId(restaurantId) as any,
  })
    .sort("-expiresAt")
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
