import * as mongoose from "mongoose";
import Offer from "../models/Offer";
import Restaurant from "../models/Restaurant";
import { OfferType } from "../../types/Offer";
import { CoordinatesType } from "../../types/Location";

const METERS_PER_MILE = 1610;

export const createOffer = async (offer: OfferType): Promise<OfferType> => {
  const rest = await Restaurant.findById(offer.restaurant).lean().exec();

  const newOffer = new Offer({
    ...offer,
    coordinates: rest.coordinates,
  });
  await newOffer.save();

  return newOffer.toJSON() as any;
};

export const findOfferById = (id: string): Promise<OfferType> =>
  Offer.findById(id).lean().exec();

export const findOffers = ({
  coordinates,
  restaurant,
  perPage = 20,
  page = 0,
}: {
  coordinates: CoordinatesType;
  restaurant?: string;
  perPage?: number;
  page?: number;
}): Promise<OfferType[]> =>
  Offer.find({
    ...(restaurant != null && {
      restaurant: new mongoose.Types.ObjectId(restaurant) as any,
    }),
    coordinates: {
      $nearSphere: {
        $geometry: {
          type: "Point",
          coordinates: [coordinates.latitude, coordinates.longitude],
        },
        $maxDistance: 5 * METERS_PER_MILE,
      },
    },
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
