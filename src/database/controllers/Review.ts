import Review from "../models/Review";
import { ReviewType } from "../../types/Review";
import { QueryResponse } from "dynamoose/dist/DocumentRetriever";

export const createReview = async (
  review: Pick<ReviewType, "userId" | "restaurantId" | "tags" | "body">
): Promise<ReviewType> => {
  const newReview = new Review(review);

  await newReview.save();

  return newReview;
};

export const findReviewById = (
  id: ReviewType["id"]
): Promise<QueryResponse<ReviewType>> => Review.query(id).limit(1).exec();

export const findReviewsByUser = (
  userId: ReviewType["userId"]
): Promise<QueryResponse<ReviewType>> => Review.query({ userId }).exec();

export const findReviewsByRestaurant = (
  restaurantId: ReviewType["restaurantId"]
): Promise<QueryResponse<ReviewType>> => Review.query({ restaurantId }).exec();

export const updateReviewById = async (
  id: ReviewType["id"],
  updates: Pick<ReviewType, "tags" | "body">
): Promise<ReviewType> => Review.update({ id }, updates);

export const deleteReviewById = async (id: ReviewType["id"]): Promise<void> =>
  Review.delete({ id });
