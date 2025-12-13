import mongoose from "mongoose";
import { env } from "../utils/env.js";

export const initMongoConnection = async () => {
  const user = env("MONGODB_USER");
  const password = env("MONGODB_PASSWORD");
  let url = env("MONGODB_URL");
  const db = env("MONGODB_DB");

  url = url.replace(/^mongodb\+srv:\/\//, ''); 
  url = url.replace(/:\d+$/, ''); 
  url = url.replace(/\/.*$/, ''); 
  const connectionString = `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(connectionString);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};