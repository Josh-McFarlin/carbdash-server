import User from "../models/User";
import { UserType } from "../../types/User";

export const createUser = async (user: UserType): Promise<UserType> => {
  const newUser = new User(user);

  await newUser.save();

  return newUser.toJSON() as any;
};

export const findUserById = (id: string): Promise<UserType> =>
  User.findById(id).lean().exec();

export const findUsers = ({
  email,
  username,
  perPage = 20,
  page = 0,
}: {
  email?: string;
  username?: string;
  perPage?: number;
  page?: number;
}): Promise<UserType[]> =>
  User.find({
    ...(email != null && {
      email: new RegExp(email, "i"),
    }),
    ...(username != null && {
      username: new RegExp(username, "i"),
    }),
  })
    .sort("-score")
    .skip(perPage * page)
    .limit(perPage)
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
