import { connect } from "mongoose";

const connectDB = (url) => {
  return connect(url, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true
  }).then(() => console.log("DATABASE IS CONNECTED..."));
  // return mongoose.connection.on('open', function () {
  //     con.connection.db.dropDatabase(function (err, res) {
  //         if (err) {
  //             console.log(err)
  //         };
  //         if (res) {
  //             console.log(res)
  //         };
  //     });
  // });
};

export default connectDB;
