const { default: mongoose } = require("mongoose");

const groupSchema = new mongoose.Schema({
  group_name: {
    type: String,
    required: true,
  },
  group_admin_email: {
    type: String,
    required: true,
  },
  group_admin_name: {
    type: String,
    required: true,
  },
  date_created: {
    type: String,
    default: Date.now(),
    required: true,
  },
  members: {
    type: Array,
    default: [],
    required: true,
  },
  group_domain: {
    type: String,
    required: true,
  },
});
const groupModel = mongoose.model("groups", groupSchema);
module.exports = {
  groupModel,
};
