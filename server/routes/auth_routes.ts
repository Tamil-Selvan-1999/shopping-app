import express, { Request, Response, Router } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../config";
import { logger } from "../logger";
import verifyToken from "../middleware/authMiddleware";

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

      return res.status(200).send({
        status: "success",
        msg: "Login success",
        data: { token },
      });
    } catch (error: any) {
      logger.error(error);
      return res
        .status(500)
        .send({ status: "fail", msg: "Internal Server Error", data: {} });
    }
  }
);

auth_router.post(
  "/register",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { username, password, first_name, last_name } = req.body;
      if (!username || !password || !first_name || !last_name) {
        return res
          .status(400)
          .send({ status: "fail", msg: "Incorrect data", data: {} });
      }
      const data = await User.findOne({ username });
      if (data) {
        return res
          .status(400)
          .send({ status: "fail", msg: "User Already present", data: {} });
      }
      const hash_pwd = await bcrypt.hash(password, 10);
      await User.create({
        username: username,
        password: hash_pwd,
        first_name: first_name,
        last_name: last_name,
        role: "customer",
      });
      return res
        .status(201)
        .send({ status: "success", msg: "Registered successfully", data: {} });
    } catch (error) {
      return res
        .status(500)
        .send({ status: "fail", msg: "Internal Server Error", data: {} });
    }
  }
);

auth_router.post(
  "/profile",
  verifyToken,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const id = req.user_id;
      const user = await User.findById(id);
      return res.status(200).send({
        status: "success",
        msg: "Success",
        data: {
          first_name: user?.first_name,
          last_name: user?.last_name,
          role: user?.role,
        },
      });
    } catch (error) {
      return res
        .status(500)
        .send({ status: "fail", msg: "Internal server error", data: {} });
    }
  }
);

export default auth_router;
