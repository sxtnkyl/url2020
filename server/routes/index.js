//GET longUrl and endpoints for generated shortUrls
const express = require("express");
const router = express.Router();

const Url = require("../models/url");

//GET req @ /:shortUrl and redirect to longUrl
//colon to signify params > https://expressjs.com/en/api.html#req.params
router.get("/:shortUrl", async (req, res) => {
  console.log(req.path, req.params);
  try {
    let shortUrl = req.params.shortUrl;
    //Url.findOne({ shortUrl }) same as {shortUrl: req.params.shortUrl}
    const url = await Url.findOne({ shortUrl });
    if (url) {
      //if mongoose finds one longUrl, redirect to it
      //https://expressjs.com/en/api.html#res.redirect
      res.redirect(url.longUrl);
    } else {
      res.status(404).json("Failed to locate Url");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
