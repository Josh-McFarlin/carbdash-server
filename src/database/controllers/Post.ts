import * as mongoose from "mongoose";
import Post from "../models/Post";
import Restaurant from "../models/Restaurant";
import Recent from "../models/Recent";
import { PostType } from "../../types/Post";

export const createPost = async (post: PostType): Promise<PostType> => {
  const newPost = new Post(post);
  await newPost.save();

  const newRecent = new Recent({
    type: "Post",
    data: newPost._id,
    tags: newPost.tags,
    ...(newPost.user != null && {
      users: [newPost.user],
    }),
    ...(newPost.restaurant != null && {
      restaurants: [newPost.restaurant],
      coordinates: (await Restaurant.findById(newPost.restaurant).lean().exec())
        .coordinates,
    }),
  });
  await newRecent.save();

  return newPost.toJSON() as any;
};

export const findPostById = (id: string): Promise<PostType> =>
  Post.findById(id).lean().exec();

export const findPosts = ({
  user,
  restaurant,
  ownerType,
  tags,
  perPage = 20,
  page = 0,
}: {
  user?: string;
  restaurant?: string;
  ownerType?: "User" | "Restaurant";
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
