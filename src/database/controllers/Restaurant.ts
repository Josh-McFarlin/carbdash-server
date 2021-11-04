import Restaurant from "../models/Restaurant";
import { RestaurantType } from "../../types/Restaurant";

export const createRestaurant = async (
  restaurant: RestaurantType
): Promise<RestaurantType> => {
  const newRestaurant = new Restaurant(restaurant);

  await newRestaurant.save();

  return newRestaurant.toJSON() as any;
};

export const findRestaurants = (): Promise<RestaurantType[]> =>
  Restaurant.find().lean().exec();

export const findRestaurantById = (id: string): Promise<RestaurantType> =>
  Restaurant.findById(id).lean().exec();

export const findRestaurantsByName = (
  name: RestaurantType["name"]
): Promise<RestaurantType[]> =>
  Restaurant.find({
    name,
  })
    .lean()
    .exec();

export const findRestaurantsByTags = (
  tags: RestaurantType["tags"]
): Promise<RestaurantType[]> =>
  Restaurant.find({
    tags,
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
