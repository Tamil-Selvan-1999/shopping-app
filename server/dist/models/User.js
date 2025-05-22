"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const DATABASE_URL = config_1.default.DATABASE_URL;
mongoose_1.default.connect(DATABASE_URL, {});
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
}, { collection: "users" });
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
