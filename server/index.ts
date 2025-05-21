import express from "express";
import cors from "cors";
import product_router from "./routes/product_routes";
import auth_router from "./routes/auth_routes";
import PORT from "./config";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", product_router);
app.use("/", auth_router);

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Hello" });
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log("Server is running and listening on port:" + PORT);
  } else {
    console.log("Error:" + error);
  }
});
