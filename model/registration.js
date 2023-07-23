const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserModel = schema({
  name: { type: String, require: true },
  mobileNo: { type: Number, require: true },
  pinCode: { type: Number, require: true },
  email: { type: String, require: true },
  pan: { type: String },
  tan: { type: String },
  address: { type: String },
  role: {
    type: String,
    require: true,
  },
  password: { type: String },
});

module.exports = mongoose.model("userModel", UserModel);
