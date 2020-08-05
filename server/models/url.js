const mongoose = require("mongoose");

//model queries methods
//https://mongoosejs.com/docs/queries.html
const urlSchema = new mongoose.Schema({
  path: String,
  shortUrl: String,
  longUrl: String,
  date: { type: String, default: Date.now },
});

module.exports = mongoose.model("Url", urlSchema);
