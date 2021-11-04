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

export const findPosts = ({ user, restaurant, tags }): Promise<PostType[]> =>
  Post.find({
    user: new mongoose.Types.ObjectId(user) as any,
    ownerType: "User",
    restaurant: new mongoose.Types.ObjectId(restaurant) as any,
    ownerType: "Restaurant",
    tags,
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
