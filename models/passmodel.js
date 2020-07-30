const mongoose = require("mongoose");
const ObjectId=mongoose.Schema.Types.ObjectId

let passwordSchema = new mongoose.Schema({
  password: String,
  sitename: String,
  username: String,
  createdbyID: ObjectId,
});

module.exports = mongoose.model("password", passwordSchema);