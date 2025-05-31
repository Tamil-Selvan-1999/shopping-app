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
      res.status(200).send({ status: "success", msg: "success", data: data });
    } catch (error) {
      console.log(error);
      res.status(404).send({ status: "fail", msg: "Not found", data: {} });
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
        return res
          .status(400)
          .send({ status: "fail", msg: "Invalid index value", data: {} });
      }

      const data = await Product.findOne({ index });

      if (!data) {
        return res
          .status(404)
          .send({ status: "fail", msg: "Product not found", data: {} });
      }

      data.isActive = !data.isActive;
      await data.save();

      return res
        .status(200)
        .send({ status: "success", msg: `Updated ${data.name}`, data: data });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ status: "fail", msg: "Internal Server Error", data: {} });
    }
  }
);

export default product_router;
