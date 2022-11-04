const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, lowercase: true, required: true },
  email: { type: String, unique: true, lowercase: true },
  password: {
    type: String,default:"123"},
});

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
