import { DATABASE_ERROR } from "@/shared/constants";
import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (error) => {
      console.log("MongoDB connection error.");
      console.log(`${DATABASE_ERROR}: ${error}`);
      process.exit();
    });
  } catch (error) {
    console.log("Error with connecting to database");
    console.log(`${DATABASE_ERROR}: ${error}`);
  }
}
