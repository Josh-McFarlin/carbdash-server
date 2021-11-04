import * as mongoose from "mongoose";
import Post from "../models/Post";
import { PostType } from "../../types/Post";

export const createPost = async (post: PostType): Promise<PostType> => {
  const newPost = new Post(post);

  await newPost.save();

  return newPost.toJSON() as any;
};

export const findPosts = (): Promise<PostType[]> =>
  Post.find().sort("-createdAt").lean().exec();

export const findPostsByUser = (userId: string): Promise<PostType[]> =>
  Post.find({
    user: new mongoose.Types.ObjectId(userId) as any,
    ownerType: "User",
  })
    .sort("-createdAt")
    .lean()
    .exec();

export const findPostsByRestaurant = (
  restaurantId: string
): Promise<PostType[]> =>
  Post.find({
    restaurant: new mongoose.Types.ObjectId(restaurantId) as any,
    ownerType: "Restaurant",
  })
    .sort("-createdAt")
    .lean()
    .exec();

export const findPostById = (id: string): Promise<PostType> =>
  Post.findById(id).lean().exec();

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
