import Restaurant from "../models/Restaurant";
import { RestaurantType } from "../../types/Restaurant";
import { QueryResponse } from "dynamoose/dist/DocumentRetriever";

export const createRestaurant = async (
  restaurant: Pick<RestaurantType, "email" | "name">
): Promise<RestaurantType> => {
  const newRestaurant = new Restaurant(restaurant);

  await newRestaurant.save();

  return newRestaurant;
};

export const findRestaurantById = (
  id: RestaurantType["id"]
): Promise<QueryResponse<RestaurantType>> =>
  Restaurant.query(id).limit(1).exec();

export const findRestaurantByEmail = (
  email: RestaurantType["email"]
): Promise<QueryResponse<RestaurantType>> =>
  Restaurant.query({ email }).limit(1).exec();

export const updateRestaurantById = async (
  id: RestaurantType["id"],
  updates: Pick<RestaurantType, "name">
): Promise<RestaurantType> => Restaurant.update({ id }, updates);

export const deleteRestaurantById = async (
  id: RestaurantType["id"]
): Promise<void> => Restaurant.delete({ id });
