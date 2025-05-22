"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const JWT_SECRET_KEY = config_1.default.JWT_SECRET_KEY;
const auth_router = express_1.default.Router();
auth_router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send({ msg: "Invalid data" });
        }
        const data = await User_1.default.findOne({ username });
        if (!data) {
            return res.status(404).send({ msg: "User not found" });
        }
        const pwdMatch = await bcrypt_1.default.compare(password, data.password);
        if (!pwdMatch) {
            return res.status(401).send({ msg: "Incorrect Credenrials" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: data._id }, JWT_SECRET_KEY, {
            expiresIn: "1h",
        });
        return res.status(200).json(token);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ msg: "Internal Server Error" });
    }
});
exports.default = auth_router;
