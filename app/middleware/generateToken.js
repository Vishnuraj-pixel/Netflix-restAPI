const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function generateAccessToken(user) {
  return jwt.sign(user, process.env.access_token, { expiresIn: "7d" });
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.refresh_token);
}

function generateAccessTokenForAdmin(user) {
  return jwt.sign(user, process.env.access_token_admin);
}

function generateRefreshTokenForAdmin(user) {
  return jwt.sign(user, process.env.refresh_token_admin);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateAccessTokenForAdmin,
  generateRefreshTokenForAdmin,
};

// require('crypto').randomBytes(64).toString('hex')
