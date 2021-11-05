import Post from "../database/models/Post";
import Review from "../database/models/Review";
import CheckIn from "../database/models/CheckIn";
import { RecentType } from "../types/Recent";

export const findRecent = async ({
  user,
  page = 0,
  perPage = 20,
}: {
  user?: string;
  page?: number;
  perPage?: number;
}): Promise<RecentType[]> => {
  const posts = await Post.find().lean().sort("-createdAt").limit(10).exec();
  const reviews = await Review.find()
    .lean()
    .sort("-createdAt")
    .limit(10)
    .exec();
  const checkIns = await CheckIn.find()
    .lean()
    .sort("-createdAt")
    .limit(20)
    .exec();

  return [
    ...posts.map((data) => ({
      type: "POST" as const,
      data,
    })),
    ...reviews.map((data) => ({
      type: "REVIEW" as const,
      data,
    })),
    ...checkIns.map((data) => ({
      type: "CHECKIN" as const,
      data,
    })),
  ].sort((a, b) => b.data.createdAt.valueOf() - a.data.createdAt.valueOf());
};
