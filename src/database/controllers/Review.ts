import * as mongoose from "mongoose";
import Review from "../models/Review";
import { ReviewType } from "../../types/Review";

export const createReview = async (review: ReviewType): Promise<ReviewType> => {
  const newReview = new Review(review);

  await newReview.save();

  return newReview.toJSON() as any;
};

export const findReviews = (): Promise<ReviewType[]> =>
  Review.find().sort("-createdAt").lean().exec();

export const findReviewById = (id: string): Promise<ReviewType> =>
  Review.findById(id).lean().exec();

export const findReviewsByUser = (userId: string): Promise<ReviewType[]> =>
  Review.find({
    user: new mongoose.Types.ObjectId(userId) as any,
  })
    .sort("-createdAt")
    .lean()
    .exec();

export const findReviewsByRestaurant = (
  restaurantId: string
): Promise<ReviewType[]> =>
  Review.find({
    restaurant: new mongoose.Types.ObjectId(restaurantId) as any,
  })
    .sort("-createdAt")
    .lean()
    .exec();

export const findReviewsByTags = (
  tags: ReviewType["tags"]
): Promise<ReviewType[]> =>
  Review.find({
    tags,
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
