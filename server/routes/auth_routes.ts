import express, { Request, Response, Router } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../config";
import { logger } from "../logger";

const JWT_SECRET_KEY = env.JWT_SECRET_KEY;

const auth_router: Router = express.Router();

auth_router.post(
  "/login",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .send({ status: "fail", msg: "Invalid data", data: {} });
      }

      const data = await User.findOne({ username });

      if (!data) {
        return res
          .status(404)
          .send({ status: "fail", msg: "User not found", data: {} });
      }

      const pwdMatch = await bcrypt.compare(password, data.password);

      if (!pwdMatch) {
        return res
          .status(401)
          .send({ status: "fail", msg: "Incorrect Credenrials", data: {} });
      }

      const token = jwt.sign({ userId: data._id }, JWT_SECRET_KEY as any, {
        expiresIn: "1h",
      });

      return res
        .status(200)
        .send({ status: "success", msg: "Login success", data: { token } });
    } catch (error: any) {
      logger.error(error);
      return res
        .status(500)
        .send({ status: "fail", msg: "Internal Server Error", data: {} });
    }
  }
);

export default auth_router;
