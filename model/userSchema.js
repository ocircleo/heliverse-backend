const { default: mongoose } = require("mongoose");
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: String,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: String,
  avatar: String,
  domain: String,
  available: Boolean,
});

const userModel = mongoose.model("users", userSchema);
module.exports = {
  userModel,
};
