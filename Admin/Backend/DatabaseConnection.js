const mongoose = require("mongoose");

dbConnect();

async function dbConnect() {
    try {
        await mongoose.connect(
            //"mongodb+srv://Naitik:Naitik2100@cluster0.fs28ogt.mongodb.net/IRCTC",
            "mongodb+srv://hetshah:hetshah_1234@cluster0.mkurv6b.mongodb.net/irctc",
            { useNewUrlParser: true }
        );
        console.log("Connection successful");
    } catch (error) {
        console.error("Connection failed:", error);
    }
}

module.exports = mongoose;


// "mongodb+srv://hetshah:hetshah_1234@cluster0.mkurv6b.mongodb.net/irctc",
