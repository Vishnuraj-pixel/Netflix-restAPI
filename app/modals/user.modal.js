const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "must provide name"],
      maxlength: [20, "name can not be more than 15 characters"],
    },
    age: {
      type: Number,
      required: [true, "must provide age"],
      trim: true,
      validate: {
        validator: (age) => age >= 18,
        message: (props) =>
          `Your age is ${props.value}, You cannot register in netflix`,
      },
    },
    username: {
      type: String,
      required: [true, "must provide username"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "must provide password"],
      trim: true,
    },
    charCode: {
      type: String,
      trim: true,
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  var id = this._id.toHexString();
  const charCode = () => id.slice(14);
  this.charCode = charCode();
  next();
});

module.exports = mongoose.model("User", UserSchema);
