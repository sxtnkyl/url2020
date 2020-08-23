//GET longUrl and endpoints for generated shortUrls
const express = require("express");
const router = express.Router();

const Url = require("../models/url");

//GET req @ /:path and redirect to longUrl
//colon to signify params > https://expressjs.com/en/api.html#req.params
router.get("/:path", async (req, res) => {
  try {
    let path = req.params.path;
    //Url.findOne({ path }) same as {path: req.params.path}
    const url = await Url.findOne({ path });
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
