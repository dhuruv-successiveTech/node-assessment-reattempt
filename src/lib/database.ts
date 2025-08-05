import mongoose from "mongoose";
import { User } from "../models/auth";

class Database {
  private static instance: Database;
  public static getInstance(): Database {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  
  public dbConnect = async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/successivedb");
      await this.seedData();

      console.log("db connected successfully");
    } catch (error) {
      throw error;
    }
  };

  private seedData = async () => {
    // Check if collection already has documents to avoid duplicate seeding
    const userCount = await User.countDocuments();

    if (userCount === 0) {
      // Insert seed data only if collection is empty
      await User.insertMany([
        { name: "Dhuruv", email: "dhuruv@kk.com" },
        { name: "raj", email: "raj@example.com" },
      ]);
      console.log("Seed data inserted");
    } else {
      console.log("Seed data already exists");
    }
  };
}
export default Database.getInstance();
