const mongoose = require("mongoose");

//model queries methods
//https://mongoosejs.com/docs/queries.html
const urlSchema = new mongoose.Schema({
  //hashed 6 chars
  path: String,
  //baseUrl + / + shortUrl
  shortUrl: String,
  //http://longurl.com/pathsandstuff
  longUrl: String,
  date: { type: String, default: Date.now },
});

module.exports = mongoose.model("Url", urlSchema);
