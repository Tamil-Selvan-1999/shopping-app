const mongoose = require("mongoose");

const { DATABASE_URL } = require("../config");

mongoose.connect(DATABASE_URL, {});

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { collection: "users" }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
