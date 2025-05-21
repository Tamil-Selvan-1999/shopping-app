const express = require("express");
const cors = require("cors");
const product_router = require("./routes/product_routes");
const auth_router = require("./routes/auth_routes");

const app = express();
const { PORT } = require("./config");

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Hello" });
});

app.use("/", product_router);
app.use("/", auth_router);

app.listen(PORT, (error) => {
  if (!error) {
    console.log("Server is running and listening on port:" + PORT);
  } else {
    console.log("Error:" + error);
  }
});
