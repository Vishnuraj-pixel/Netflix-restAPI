const Admin = require("../modals/admin.modal");
const asyncWrapper = require("../middleware/async");
const bcrypt = require("bcrypt");
const {
  generateAccessTokenForAdmin,
  generateRefreshTokenForAdmin,
} = require("../middleware/generateToken");
const dotenv = require("dotenv");

const createAdmin = asyncWrapper(async (req, res) => {
  const { username, password, admin_code } = req.body;
  dotenv.config();
  console.log(admin_code);
  try {
    if (!admin_code) {
      res.status(201).json({ msg: "Type admin code" });
    } else if (admin_code == process.env.admin_code) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const create = {};
      create.username = username;
      create.password = hashedPassword;
      await Admin.create(create).then((___) => {
        res.status(201).json({ msg: "Successfully registered" });
      });
    } else {
      res.status(401).json({ msg: "Wrong admin code" });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message || "error in creating admin" });
  }
});

const signinAdmin = asyncWrapper(async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = { username: username };
    const findAdmin = await Admin.findOne({ username: username })
      .exec()
      .then((result) => {
        bcrypt.compare(password, result.password).then((match) => {
          if (match) {
            const accessToken = generateAccessTokenForAdmin(admin);
            const refreshToken = generateRefreshTokenForAdmin(admin);
            res
              .status(201)
              .json({ access_token: accessToken, refresh_token: refreshToken });
          }
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message || "error in admin sign-in" });
  }
});

module.exports = {
  createAdmin,
  signinAdmin,
};
