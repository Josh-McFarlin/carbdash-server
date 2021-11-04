import User from "../models/User";
import { UserType } from "../../types/User";

export const createUser = async (user: UserType): Promise<UserType> => {
  const newUser = new User(user);

  await newUser.save();

  return newUser.toJSON() as any;
};

export const findUserById = (id: string): Promise<UserType> =>
  User.findById(id).lean().exec();

export const findUsers = ({ email, username }): Promise<UserType[]> =>
  User.find({
    email,
    username,
  })
    .sort("username")
    .lean()
    .exec();

export const updateUserById = (
  id: string,
  updates: Partial<UserType>
): Promise<UserType> =>
  User.findByIdAndUpdate(id, updates, {
    new: true,
  })
    .lean()
    .exec();

export const deleteUserById = (id: string): Promise<UserType> =>
  User.findByIdAndDelete(id).lean().exec();
