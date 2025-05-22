"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const DATABASE_URL = config_1.default.DATABASE_URL;
mongoose_1.default.connect(DATABASE_URL, {});
const recommendedSchema = new mongoose_1.default.Schema({
    id: Number,
    name: String,
}, { _id: false });
const productSchema = new mongoose_1.default.Schema({
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
}, { collection: "items" });
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
