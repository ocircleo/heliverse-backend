const jwt = require("jsonwebtoken");
const verifyJwt = (req, res, next) => {
  let headers = req.headers.authorization;
  // console.log(headers);
  if (!headers) {
    res.status(404).send({ error: true, message: "unauthorized Access" });
  }
  const token = headers.split(" ")[1];
  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      return res
        .status(404)
        .send({ error: true, message: "unauthorized Access" });
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = verifyJwt;