const mongoose = require("mongoose");
// this schema should contains id, name, isApprove
const UserSchema = new mongoose.Schema({
  id: Number,
  name: String,
  isApprove: Boolean,
});
module.exports = mongoose.model("User", UserSchema);
