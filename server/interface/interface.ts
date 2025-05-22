import { Request } from "express";

export interface authRequest extends Request {
  user_id: string;
}
