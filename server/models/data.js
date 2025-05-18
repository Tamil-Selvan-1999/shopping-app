const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/items_data", {});

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
    price: { type: String, required: true }, // Keeping it as String because of the '$' symbol
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
); // Use actual collection name

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
