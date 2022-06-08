const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const connectDB = require("./app/config/config").default;
const user = require("./app/routes/user.route");
const subscriptionPlan = require("./app/routes/subscriptionPlan.route");
const movie = require("./app/routes/movie.route");
const movieDetail = require("./app/routes/movieDetail.route");
const Admin = require("./app/routes/admin.route");
const dotenv = require("dotenv");

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./uploads"));
app.use("/v1/api/user", user);
app.use("/v1/api/subscription-plan", subscriptionPlan);
app.use("/v1/api/movies", movie);
app.use("/v1/api/movieDetail", movieDetail);
app.use("/v1/api/admin", Admin);

dotenv.config();
const port = process.env.PORT;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on port : ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
