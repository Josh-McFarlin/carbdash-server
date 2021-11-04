import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

const setupMongoDB = async (): Promise<void> => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(MONGODB_URL);

    require("./models/User");
    require("./models/Restaurant");
    require("./models/Review");
    require("./models/Post");
    require("./models/CheckIn");
    require("./models/SocialGroup");
    require("./models/Challenge");
    require("./models/Offer");
  } catch (error) {
    console.error("Failed to connect to MongoDB Atlas!");
    throw error;
  }
};

export default setupMongoDB;
