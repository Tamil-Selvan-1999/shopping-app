import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "../config";
import { logger } from "../logger";

const JWT_SECRET_KEY = env.JWT_SECRET_KEY;

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      res.status(401).send({ msg: "Invalid request" });
    }
    const token: string = authHeader!.split(" ")[1];
    if (!token) {
      res.status(401).send({ msg: "Invalid request" });
    }
    const decoded = jwt.verify(token, JWT_SECRET_KEY!);
    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "userId" in decoded
    ) {
      req.user_id = (decoded as JwtPayload).userId;
      next();
    } else {
      res.status(500).send({ msg: "Internal server error" });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).send({ msg: "Internal server error" });
  }
};

export default verifyToken;
