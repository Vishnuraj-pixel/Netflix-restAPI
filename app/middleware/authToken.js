const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function authToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.access_token, (err, user) => {
    if (err) return res.status(403).json({ msg: err.message });
    req.user = user;
    next();
  });
}

module.exports = authToken;
