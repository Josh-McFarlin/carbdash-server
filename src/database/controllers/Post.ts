import * as mongoose from "mongoose";
import Post from "../models/Post";
import Restaurant from "../models/Restaurant";
import Recent from "../models/Recent";
import User from "../models/User";
import { PostType } from "../../types/Post";
import { RestaurantType } from "../../types/Restaurant";

export const createPost = async (post: PostType): Promise<PostType> => {
  const rest: RestaurantType | null =
    post.restaurant != null
      ? await Restaurant.findById(post.restaurant).lean().exec()
      : null;

  const newPost = new Post({
    ...post,
    ...(rest != null &&
      post.category == null && {
        category: rest.category,
      }),
  });
  await newPost.save();

  const newRecent = new Recent({
    type: "Post",
    data: newPost._id,
    tags: newPost.tags,
    category: newPost.category,
    ...(newPost.user != null && {
      users: [newPost.user],
    }),
    ...(newPost.restaurant != null && {
      restaurants: [newPost.restaurant],
      coordinates: rest.coordinates,
    }),
  });
  await newRecent.save();

  if (newPost.user != null) {
    await User.findByIdAndUpdate(newPost.user, {
      $inc: {
        score: 20,
      },
    });
  }

  return newPost.toJSON() as any;
};

export const findPostById = (id: string): Promise<PostType> =>
  Post.findById(id).lean().exec();

export const findPosts = ({
  user,
  restaurant,
  ownerType,
  category,
  tags,
  perPage = 20,
  page = 0,
}: {
  user?: string;
  restaurant?: string;
  ownerType?: "User" | "Restaurant";
  category?: string;
  tags?: string[];
  perPage?: number;
  page?: number;
}): Promise<PostType[]> =>
  Post.find({
    ...(user != null && {
      user: new mongoose.Types.ObjectId(user) as any,
    }),
    ...(restaurant != null && {
      restaurant: new mongoose.Types.ObjectId(restaurant) as any,
    }),
    ...(ownerType != null && {
      ownerType,
    }),
    ...(category != null && {
      category,
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

export const updatePostById = (
  id: string,
  updates: Partial<PostType>
): Promise<PostType> =>
  Post.findByIdAndUpdate(id, updates, {
    new: true,
  })
    .lean()
    .exec();

export const deletePostById = (id: string): Promise<PostType> =>
  Post.findByIdAndDelete(id).lean().exec();
