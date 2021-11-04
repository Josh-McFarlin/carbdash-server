import Restaurant from "../models/Restaurant";
import { RestaurantType } from "../../types/Restaurant";

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
  name,
  tags,
}: {
  name?: string;
  tags?: string[];
}): Promise<RestaurantType[]> =>
  Restaurant.find({
    ...(name != null && {
      name,
    }),
    ...(tags != null && {
      tags,
    }),
  })
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
