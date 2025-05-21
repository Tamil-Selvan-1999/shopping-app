const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config");

const verifyToken = (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    if (!token) {
      return res.status(401).send({ msg: "Invalid request" });
    }
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user_id = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Internal server error" });
  }
};

export default verifyToken;
