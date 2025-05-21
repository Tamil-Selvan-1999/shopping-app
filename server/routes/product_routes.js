const express = require("express");
const Product = require("../models/Product");
const verifyToken = require("../middleware/authMiddleware");

const product_router = new express.Router();

product_router.get("/products", async (req, res) => {
  try {
    let data = await Product.find().lean();
    data = data.map((item) => {
      return { ...item, isDue: true };
    });
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: "Not found" });
  }
});

product_router.post("/products/:index", verifyToken, async (req, res) => {
  try {
    const index = parseInt(req.params.index);

    // Check if the index is a valid number
    if (isNaN(index)) {
      return res.status(400).send({ msg: "Invalid index value" });
    }

    const data = await Product.findOne({ index });

    if (!data) {
      return res.status(404).send({ msg: "Product not found" });
    }

    data.isActive = !data.isActive;
    await data.save();

    return res.status(200).send({ msg: `Updated ${data.name}` });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Internal Server Error", error });
  }
});

module.exports = product_router;
