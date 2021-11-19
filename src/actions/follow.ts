import User from "../database/models/User";
import Restaurant from "../database/models/Restaurant";
import { UserType } from "../types/User";
import { AccountRefType } from "../types/AccountRef";
import { RestaurantType } from "../types/Restaurant";

export const findFollowsById = async (
  authedUserId: string,
  detailed = false
): Promise<
  | {
      followers: (UserType | RestaurantType)[];
      following: (UserType | RestaurantType)[];
    }
  | {
      followers: AccountRefType[];
      following: AccountRefType[];
    }
> => {
  const authedUser = await User.findById(authedUserId).exec();

  if (authedUser == null) {
    throw new Error("User not found!");
  }

  if (detailed) {
    return {
      followers: [
        ...(await authedUser.populate("followers")).followers.values(),
      ],
      following: [
        ...(await authedUser.populate("following")).following.values(),
      ],
    };
  } else {
    return {
      followers: [...authedUser.followers.values()],
      following: [...authedUser.following.values()],
    };
  }
};

export const toggleFollowById = async (
  authedUserId: string,
  followType: "User" | "Restaurant",
  followId: string
): Promise<UserType> => {
  if (authedUserId == null || followId == null) {
    throw new Error("User not found!");
  } else if (authedUserId === followId) {
    throw new Error("Cannot follow self!");
  }

  const authedUser = await User.findById(authedUserId).exec();
  const followUser =
    followType === "User"
      ? await User.findById(followId).exec()
      : await Restaurant.findById(followId).exec();

  if (authedUser == null || followUser == null) {
    throw new Error("User not found!");
  }

  if (authedUser.following.has(followType + followId)) {
    authedUser.following.delete(followType + followId);
    followUser.followers.delete(followType + authedUserId);
  } else {
    authedUser.following.set(followType + followId, {
      type: "User",
      ref: followUser._id,
    });
    followUser.followers.set(followType + authedUserId, {
      type: "User",
      ref: authedUser._id,
    });
  }

  await authedUser.save();
  await followUser.save();

  return authedUser.toJSON() as any;
};
