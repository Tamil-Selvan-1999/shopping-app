import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { logger, stream } from "./logger";
import product_router from "./routes/product_routes";
import auth_router from "./routes/auth_routes";
import env from "./config";
import connectDB from "./database";
import path from "path";

const PORT = env.PORT;

const app = express();
app.use(morgan("combined", { stream }));
app.use(express.json());
app.use(cors());
try {
  connectDB();
  logger.info("DB connected");
} catch (error) {
  logger.error("Db not connected - " + error);
}

app.use(
  "/static/images",
  express.static(path.join(process.cwd(), "static/images"))
);

app.use("/", product_router);
app.use("/", auth_router);

app.get("/", (req: Request, res: Response): void => {
  res.status(200).send({ msg: "Hello" });
});

app.listen(PORT, (error: any) => {
  if (!error) {
    logger.info("Server is running and listening on port:" + PORT);
  } else {
    logger.error("Error:" + error);
  }
});
