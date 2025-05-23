"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Product_1 = __importDefault(require("../models/Product"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const product_router = express_1.default.Router();
product_router.get("/products", async (req, res) => {
    try {
        let data = await Product_1.default.find().lean();
        data = data.map((item) => {
            return { ...item, isDue: true };
        });
        res.status(200).send(data);
    }
    catch (error) {
        console.log(error);
        res.status(404).send({ msg: "Not found" });
    }
});
product_router.post("/products/:index", authMiddleware_1.default, async (req, res) => {
    try {
        const index = parseInt(req.params.index);
        // Check if the index is a valid number
        if (isNaN(index)) {
            return res.status(400).send({ msg: "Invalid index value" });
        }
        const data = await Product_1.default.findOne({ index });
        if (!data) {
            return res.status(404).send({ msg: "Product not found" });
        }
        data.isActive = !data.isActive;
        await data.save();
        return res.status(200).send({ msg: `Updated ${data.name}` });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ msg: "Internal Server Error", error });
    }
});
exports.default = product_router;
