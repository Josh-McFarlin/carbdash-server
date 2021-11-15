import { CoordinatesType } from "../../types/Location";
import { RecentType } from "../../types/Recent";
import Recent from "../models/Recent";
import mongoose from "mongoose";

const METERS_PER_MILE = 1610;

export const findRecent = ({
  tags,
  coordinates,
  users,
  restaurants,
  perPage = 20,
  page = 0,
}: {
  tags?: string[];
  coordinates?: CoordinatesType;
  users?: string[];
  restaurants?: string[];
  perPage?: number;
  page?: number;
}): Promise<RecentType[]> =>
  Recent.find({
    ...(coordinates != null && {
      coordinates: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [coordinates.latitude, coordinates.longitude],
          },
          $maxDistance: 15 * METERS_PER_MILE,
        },
      },
    }),
    ...((tags || coordinates || users || restaurants) && {
      $or: [
        {
          ...(tags != null && {
            tags: {
              $in: tags,
            },
          }),
        },
        {
          ...(users != null && {
            users: {
              $in: users.map(
                (user) => new mongoose.Types.ObjectId(user) as any
              ),
            },
          }),
        },
        {
          ...(restaurants != null && {
            restaurants: {
              $in: users.map(
                (restaurant) => new mongoose.Types.ObjectId(restaurant) as any
              ),
            },
          }),
        },
      ],
    }),
  })
    .sort("-createdAt")
    .skip(perPage * page)
    .limit(perPage)
    .lean()
    .populate("data")
    .select("_id type data")
    .exec();
