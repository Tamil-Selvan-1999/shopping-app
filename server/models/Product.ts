import mongoose from "mongoose";
import env from "../config";

const DATABASE_URL = env.DATABASE_URL;

mongoose.connect(DATABASE_URL, {});

const recommendedSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    index: { type: Number, required: true },
    isActive: { type: Boolean, required: true },
    price: { type: String, required: true },
    picture: { type: String, required: true },
    productColor: { type: String, required: true },
    name: { type: String, required: true },
    company: { type: String, required: true },
    address: { type: String, required: true },
    about: { type: String, required: true },
    registered: { type: Date, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    tags: { type: [String], required: true },
    recommemded: { type: [recommendedSchema], required: true },
  },
  { collection: "items" }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
