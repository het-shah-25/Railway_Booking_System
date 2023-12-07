const mongoose = require("mongoose");
dbConnect();
async function dbConnect() {
  try {
    await mongoose.connect(
      "mongodb+srv://hetshah:hetshah_1234@cluster0.mkurv6b.mongodb.net/irctc",
      { useNewUrlParser: true }
    );
    console.log("Connection successfull");
  } catch (error) {
    console.log(error);
    console.log("connection failed");
  }
}

module.exports = mongoose;
