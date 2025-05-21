const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config");

const auth_router = new express.Router();

auth_router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({ msg: "Invalid data" });
    }

    const data = await User.findOne({ username });

    if (!data) {
      return res.status(404).send({ msg: "User not found" });
    }

    const pwdMatch = await bcrypt.compare(password, data.password);

    if (!pwdMatch) {
      return res.status(401).send({ msg: "Incorrect Credenrials" });
    }

    const token = jwt.sign({ userId: data._id }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.status(200).json(token);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Internal Server Error" });
  }
});

module.exports = auth_router;
