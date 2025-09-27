import express, { Request, Response, Router } from "express";
import Product from "../models/Product";
import verifyToken from "../middleware/authMiddleware";
import { logger } from "../logger";

const product_router: Router = express.Router();

product_router.get(
  "/products",
  async (req: Request, res: Response): Promise<any> => {
    try {
      let data = await Product.find().lean();
      return res
        .status(200)
        .send({ status: "success", msg: "success", data: data });
    } catch (error) {
      logger.error(error);
      return res
        .status(404)
        .send({ status: "fail", msg: "Not found", data: {} });
    }
  }
);

product_router.post(
  "/products/add",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const data = req.body;
      let productData = await new Product(data);
      if (productData) {
        await productData.save();
      }
      return res
        .status(201)
        .send({ status: "success", msg: "success", data: productData });
    } catch (error) {
      logger.error(error);
      return res.status(400).send({ status: "fail", msg: "Error", data: {} });
    }
  }
);

export default product_router;
