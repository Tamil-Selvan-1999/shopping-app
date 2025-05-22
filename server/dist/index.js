"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_routes_1 = __importDefault(require("./routes/product_routes"));
const auth_routes_1 = __importDefault(require("./routes/auth_routes"));
const config_1 = __importDefault(require("./config"));
const PORT = config_1.default.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/", product_routes_1.default);
app.use("/", auth_routes_1.default);
app.get("/", (req, res) => {
    res.status(200).send({ msg: "Hello" });
});
app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server is running and listening on port:" + PORT);
    }
    else {
        console.log("Error:" + error);
    }
});
