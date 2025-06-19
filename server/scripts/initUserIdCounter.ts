// scripts/initUserIdCounter.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
// import User from "../models/user";     // Adjust path as needed
import Counter from "../models/counter.model"; // Adjust path as needed
import User from "../models/User";

dotenv.config(); // Load DB credentials from .env

const MONGO_URI =
  process.env.DATABASE_URL || "mongodb://localhost:27017/your-db";

async function initUserIdCounter() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);

    console.log("🔍 Fetching highest existing userId...");
    const maxUser = await User.findOne()
      .sort({ userId: -1 })
      .select("userId")
      .lean();
    const startingValue = maxUser?.userId ?? 0;

    console.log(
      `📌 Initializing counter with starting value: ${startingValue}`
    );

    await Counter.findOneAndUpdate(
      { _id: "userId" },
      { $set: { sequence_value: startingValue } },
      { upsert: true }
    );

    console.log("✅ Counter initialized successfully.");
  } catch (error) {
    console.error("❌ Error initializing counter:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB.");
  }
}

initUserIdCounter();
