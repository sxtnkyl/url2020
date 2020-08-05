const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const baseRouter = require("./routes/index");
const urlRouter = require("./routes/url");

const linkDB = require("./db");
//execute linkDB to connect to monogDB
linkDB();

//http://expressjs.com/en/4x/api.html#app.use
//http://expressjs.com/en/4x/api.html#express.urlencoded
//https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded/51844327
//mount middleware function for parsing urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//assure only api calls come from hosted UI page
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//DEFINE ROUTES
app.use("/", baseRouter);
app.use("/url", urlRouter);

const PORT = process.env.PORT || 5000;

//http://expressjs.com/en/4x/api.html#app.listen
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
