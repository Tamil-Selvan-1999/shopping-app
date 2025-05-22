import mongoose from "mongoose";

import env from "../config";

const DATABASE_URL = env.DATABASE_URL;

mongoose.connect(DATABASE_URL, {});

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { collection: "users" }
);

const User = mongoose.model("User", UserSchema);

export default User;
