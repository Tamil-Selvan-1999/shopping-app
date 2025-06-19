// scripts/initProductIdCounter.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
// import Product from "../models/product.model"; // ✅ Adjust path as needed
import Counter from "../models/counter.model"; // ✅ Same here
import Product from "../models/Product";

dotenv.config(); // Load env vars

const MONGO_URI =
  process.env.DATABASE_URL || "mongodb://localhost:27017/your-db";

async function initProductIdCounter() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);

    console.log("🔍 Fetching highest existing productId...");
    const maxProduct = await Product.findOne()
      .sort({ productId: -1 })
      .select("productId")
      .lean();
    const startingValue = maxProduct?.productId ?? 0;

    console.log(
      `📌 Initializing productId counter with value: ${startingValue}`
    );

    await Counter.findOneAndUpdate(
      { _id: "productId" },
      { $set: { sequence_value: startingValue } },
      { upsert: true }
    );

    console.log("✅ productId counter initialized.");
  } catch (error) {
    console.error("❌ Error initializing productId counter:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB.");
  }
}

initProductIdCounter();
