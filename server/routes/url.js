//handle POST routes/actions
const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
//need schema to validate req longurl
const Url = require("../models/url");
const hash = require("hash.js");

//create shortUrl, hash, combine first 3 + last 3 chars
const urlHasher = (url) => {
  let hashedUrl = hash.sha256().update(url).digest("hex");
  let shortenedHashedUrl = hashedUrl.slice(0, 3) + hashedUrl.slice(-3);
  return shortenedHashedUrl;
};

//POST @route /url/shorten, makes the shortened url
//path is "/url" in server index.js, only need "/shorten"
router.post("/shorten", async (req, res) => {
  console.log("post called");
  const { longUrl } = req.body;
  const baseUrl = process.env.BASEURL;

  //check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid Source");
  }

  //validate longUrl is correct format
  if (
    validUrl.isUri(longUrl) ||
    validUrl.isHttpUri(longUrl) ||
    validUrl.isHttpsUri(longUrl)
  ) {
    //is it already in database?
    try {
      //using mongoose, make async await
      //mongoose model method 'findOne' gets object with key 'longUrl' and value req.body.longUrl
      Url.estimatedDocumentCount((err, count) => {
        if (err) {
          console.log(err);
        } else {
          //keep the collection cheap! reset on too big
          console.log("Estimated Count :", count);
          if (count > 20) Url.collection.drop();
        }
      });
      let url = await Url.findOne({ longUrl });
      //if found, returns whole DB object
      if (url) {
        res.json(url);
      }
      //if not found in DB, need to make entry- new shortened url and new mongoose schema
      else {
        let shortUrl = urlHasher(longUrl);
        let path = baseUrl + "/" + shortUrl;
        //create new instance
        const newurl = new Url({
          path,
          shortUrl,
          longUrl,
          date: new Date(),
        });
        //use mongoose .save() on the instance
        await newurl.save();
        res.json(newurl);
      }
    } catch (error) {
      //error in mongoDB response
      console.log(error);
      res.status(500).json("Server Error");
    }
  }
  //longUrl didn't pass validUrl
  else {
    res.status(401).json("Invalid Long Url");
  }
});

module.exports = router;
