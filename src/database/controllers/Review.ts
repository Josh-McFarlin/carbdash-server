import * as mongoose from "mongoose";
import Review from "../models/Review";
import { ReviewType } from "../../types/Review";

export const createReview = async (review: ReviewType): Promise<ReviewType> => {
  const newReview = new Review(review);

  await newReview.save();

  return newReview.toJSON() as any;
};

export const findReviewById = (id: string): Promise<ReviewType> =>
  Review.findById(id).lean().exec();

export const findReviews = ({
  user,
  restaurant,
  tags,
}: {
  user?: string;
  restaurant?: string;
  tags?: string[];
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
