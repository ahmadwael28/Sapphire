const jwt = require("jsonwebtoken");

const SECRET_KEY = require("../config");

const verifyToken = (req, res, next) => {
  const token = req.headers["token"];
  if (!token)
    return res
      .status(401)
      .send({ auth: false, message: "Unauthorized, No token provided." });
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err)
      res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    else req.user = decoded.user;
    next(); //go to next middleware
  });
};

module.exports = {
  verifyToken,
};
