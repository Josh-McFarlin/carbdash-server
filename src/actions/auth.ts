import User from "../database/models/User";
import Restaurant from "../database/models/Restaurant";
import type { UserType } from "../types/User";
import type { RestaurantType } from "../types/Restaurant";

export const findUserByAuth = (auth0Id: string): Promise<UserType> =>
  User.findOne({
    auth0Id,
  })
    .lean()
    .exec();

export const findRestaurantByAuth = (
  auth0Id: string
): Promise<RestaurantType> =>
  Restaurant.findOne({
    auth0Id,
  })
    .lean()
    .exec();
