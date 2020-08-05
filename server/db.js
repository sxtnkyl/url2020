const mongoose = require("mongoose");
//get db link from .env
const db = process.env.MONGOURI;

//mongoose return Promise -> use async/await
const linkDB = async () => {
  try {
    //connect for one db
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongoBD connected");
  } catch (error) {
    console.log(error);
    //https://nodejs.org/api/process.html#process_process_exit_code
    process.exit(1);
  }
};

module.exports = linkDB;
