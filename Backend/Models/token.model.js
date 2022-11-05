const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  sessionTokens:{type: String,default:"SessionTokens"}
},{
      timestamps: true,
  }
  );

const tokenModel = mongoose.model("Tokens", tokenSchema);

module.exports = tokenModel;
