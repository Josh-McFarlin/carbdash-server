import * as mongoose from "mongoose";
import Review from "../models/Review";
import Restaurant from "../models/Restaurant";
import Recent from "../models/Recent";
import { ReviewType } from "../../types/Review";
import User from "../models/User";
import { RestaurantType } from "../../types/Restaurant";

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

  await Restaurant.findByIdAndUpdate(newReview.restaurant, {
    ratings: {
      count: rest.ratings.count + 1,
      sum: rest.ratings.sum + newReview.stars,
    },
  });

  if (newReview.user != null) {
    await User.findByIdAndUpdate(newReview.user, {
      $inc: {
        score: 15,
      },
    });
  }

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
      tags: {
        $in: tags,
      },
    }),
  })
    .sort("-createdAt")
    .skip(perPage * page)
    .limit(perPage)
    .lean()
    .exec();

/**
 * Returns the reviews and summary for a particular restaurant
 * Uses a modified version of aggregation created by
 * @author Tom Slabbaert
 * @link https://stackoverflow.com/a/60441220
 * @param restaurant The ID of the restaurant to summarize reviews
 */
export const summarizeReviewsByRestaurant = (
  restaurant: RestaurantType["_id"]
): Promise<{
  _id: RestaurantType["_id"];
  avgRating: number;
  totalReviews: number;
  stars: [number, number, number, number, number];
  reviews: ReviewType[];
}> =>
  Review.aggregate([
    {
      $match: {
        restaurant: new mongoose.Types.ObjectId(restaurant),
      },
    },
    {
      $facet: {
        numbers: [
          {
            $group: {
              _id: {
                restaurant: "$restaurant",
                stars: "$stars",
              },
              count: {
                $sum: 1.0,
              },
            },
          },
          {
            $group: {
              _id: "$_id.restaurant",
              counts: {
                $push: {
                  stars: "$_id.stars",
                  count: "$count",
                },
              },
              totalItemCount: {
                $sum: "$count",
              },
              totalRating: {
                $sum: "$_id.stars",
              },
            },
          },
        ],
        reviews: [
          {
            $skip: 0,
          },
          {
            $limit: 20,
          },
        ],
      },
    },
    {
      $unwind: "$numbers",
    },
    {
      $project: {
        _id: "$numbers._id",
        avgRating: {
          $divide: ["$numbers.totalRating", "$numbers.totalItemCount"],
        },
        totalReviews: "$numbers.totalItemCount",
        stars: "$numbers.counts",
        reviews: "$reviews",
      },
    },
  ])
    .exec()
    .then((res) => {
      if (res == null || res.length === 0) {
        throw new Error("Restaurant not found!");
      }

      return res[0];
    })
    .then((summary) => {
      const newStars = [0, 0, 0, 0, 0];

      (summary.stars as { stars: number; count: number }[]).forEach(
        ({ stars, count }) => {
          newStars[stars - 1] = count / summary.totalReviews;
        }
      );

      summary.stars = newStars;

      return summary;
    });

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
