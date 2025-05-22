"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const JWT_SECRET_KEY = config_1.default.JWT_SECRET_KEY;
const verifyToken = (req, res, next) => {
    try {
        const authReq = req;
        const authHeader = authReq.header("Authorization");
        if (!authHeader) {
            res.status(401).send({ msg: "Invalid request" });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.status(401).send({ msg: "Invalid request" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET_KEY);
        if (typeof decoded === "object" &&
            decoded !== null &&
            "userId" in decoded) {
            authReq.user_id = decoded.userId;
            next();
        }
        else {
            res.status(500).send({ msg: "Internal server error" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Internal server error" });
    }
};
exports.default = verifyToken;
