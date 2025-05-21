import express, { Request, Response, Router } from "express";
import Product from "../models/Product";
import verifyToken from "../middleware/authMiddleware";

const product_router: Router = express.Router();

product_router.get(
  "/products",
  async (req: Request, res: Response): Promise<any> => {
    try {
      let data = await Product.find().lean();
      data = data.map((item: any) => {
        return { ...item, isDue: true };
      });
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      res.status(404).send({ msg: "Not found" });
    }
  }
);

product_router.post(
  "/products/:index",
  verifyToken,
  async (req: Request, res: Response): Promise<any> => {
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
  }
);

export default product_router;
