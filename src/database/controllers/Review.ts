import * as mongoose from "mongoose";
import Review from "../models/Review";
import Restaurant from "../models/Restaurant";
import Recent from "../models/Recent";
import { ReviewType } from "../../types/Review";

export const createReview = async (review: ReviewType): Promise<ReviewType> => {
  const newReview = new Review(review);
  await newReview.save();

  const rest = await Restaurant.findById(newReview.restaurant).lean().exec();

  const newRecent = new Recent({
    type: "Review",
    data: newReview._id,
    tags: newReview.tags,
    coordinates: rest.coordinates,
    users: [newReview.user],
    restaurants: [newReview.restaurant],
  });
  await newRecent.save();

  return newReview.toJSON() as any;
};

export const findReviewById = (id: string): Promise<ReviewType> =>
  Review.findById(id).lean().exec();

export const findReviews = ({
  user,
  restaurant,
  tags,
  perPage = 20,
  page = 0,
}: {
  user?: string;
  restaurant?: string;
  tags?: string[];
  perPage?: number;
  page?: number;
}): Promise<ReviewType[]> =>
  Review.find({
    ...(user != null && {
      user: new mongoose.Types.ObjectId(user) as any,
    }),
    ...(restaurant != null && {
      restaurant: new mongoose.Types.ObjectId(restaurant) as any,
    }),
    ...(tags != null && {
      tags,
    }),
  })
    .sort("-createdAt")
    .skip(perPage * page)
    .limit(perPage)
    .lean()
    .exec();

export const updateReviewById = (
  id: string,
  updates: Partial<ReviewType>
): Promise<ReviewType> =>
  Review.findByIdAndUpdate(id, updates, {
    new: true,
  })
    .lean()
    .exec();

export const deleteReviewById = (id: string): Promise<ReviewType> =>
  Review.findByIdAndDelete(id).lean().exec();
