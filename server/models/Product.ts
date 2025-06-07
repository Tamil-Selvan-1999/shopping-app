import mongoose from "mongoose";
import {
  Dimensions,
  Meta,
  ProductDocument,
  Review,
} from "../interface/interface";

const ReviewSchema = new mongoose.Schema<Review>(
  {
    rating: Number,
    comment: String,
    date: Date,
    reviewerName: String,
    reviewerEmail: String,
  },
  { _id: false }
);

const DimensionsSchema = new mongoose.Schema<Dimensions>(
  {
    width: Number,
    height: Number,
    depth: Number,
  },
  { _id: false }
);

const MetaSchema = new mongoose.Schema<Meta>(
  {
    createdAt: Date,
    updatedAt: Date,
    barcode: String,
    qrCode: String,
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema<ProductDocument>(
  {
    productId: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: String,
    category: String,
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    tags: [String],
    brand: String,
    sku: String,
    weight: Number,
    dimensions: DimensionsSchema,
    warrantyInformation: String,
    shippingInformation: String,
    availabilityStatus: String,
    reviews: [ReviewSchema],
    returnPolicy: String,
    minimumOrderQuantity: Number,
    meta: MetaSchema,
    images: [String],
    thumbnail: String,
  },
  { collection: "products_data" }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
