import Restaurant from "../models/Restaurant";
import { RestaurantType } from "../../types/Restaurant";
import { CoordinatesType } from "../../types/Location";

const METERS_PER_MILE = 1610;

export const createRestaurant = async (
  restaurant: RestaurantType
): Promise<RestaurantType> => {
  const newRestaurant = new Restaurant(restaurant);

  await newRestaurant.save();

  return newRestaurant.toJSON() as any;
};

export const findRestaurantById = (id: string): Promise<RestaurantType> =>
  Restaurant.findById(id).lean().exec();

export const findRestaurants = ({
  coordinates,
  name,
  tags,
  perPage = 20,
  page = 0,
}: {
  coordinates: CoordinatesType;
  name?: string;
  tags?: string[];
  perPage?: number;
  page?: number;
}): Promise<RestaurantType[]> =>
  Restaurant.find({
    ...(name != null && {
      name,
    }),
    ...(tags != null && {
      tags,
    }),
  })
    .near({
      center: [coordinates.latitude, coordinates.longitude],
      maxDistance: 5 * METERS_PER_MILE,
    })
    .skip(perPage * page)
    .limit(perPage)
    .lean()
    .exec();

export const updateRestaurantById = (
  id: string,
  updates: Partial<RestaurantType>
): Promise<RestaurantType> =>
  Restaurant.findByIdAndUpdate(id, updates, {
    new: true,
  })
    .lean()
    .exec();

export const deleteRestaurantById = (id: string): Promise<RestaurantType> =>
  Restaurant.findByIdAndDelete(id).lean().exec();
