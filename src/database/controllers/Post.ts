import * as mongoose from "mongoose";
import Post from "../models/Post";
import { PostType } from "../../types/Post";

export const createPost = async (post: PostType): Promise<PostType> => {
  const newPost = new Post(post);

  await newPost.save();

  return newPost.toJSON() as any;
};

export const findPostById = (id: string): Promise<PostType> =>
  Post.findById(id).lean().exec();

export const findPosts = ({
  user,
  restaurant,
  ownerType,
  tags,
}: {
  user?: string;
  restaurant?: string;
  ownerType?: string;
  tags?: string[];
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
      tags,
    }),
  })
    .sort("-createdAt")
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
