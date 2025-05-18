const express = require("express");
const item = require("./models/data");
const cors = require("cors");
const product_router = require("./routes/product_routes");

const app = express();
const PORT = 4000;

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Hello" });
});

app.use("/", product_router);

app.listen(PORT, (error) => {
  if (!error) {
    console.log("Server is running and listening on port:" + PORT);
  } else {
    console.log("Error:" + error);
  }
});
