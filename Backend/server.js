const express = require("express");
const mongoose = require("mongoose");

const app = express();
const db = require("./DatabaseConnection.js");
const userRoute = require("./routes/userRoute");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(express.json());

app.use("/api/user/", userRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

//booking code
const bookingSchema = new mongoose.Schema({
  userId: String,
  trainNumber: String,
  date: String,
  goingFrom: String,
  goingTo: String,
  passengers: Array,
  seatNumbers: Array,
  totalAmount: Number,
  selectedClass: String,
  bookingStatus: { type: Number, default: 0 },
  transactionId: String,
  pnrNumber: String,
  trainName: String, // Add Train Name field
});

const Booking = mongoose.model("Booking", bookingSchema);

// Middleware
app.use(bodyParser.json());

// API endpoint to save booking data
app.post("/api/saveBooking", async (req, res) => {
  try {
    const {
      userId,
      trainNumber,
      date,
      goingFrom,
      goingTo,
      passengers,
      seatNumbers,
      totalAmount,
      selectedClass,
    } = req.body;

    // Generate a 12-digit random transaction id
    const transactionId = Math.floor(
      100000000000 + Math.random() * 900000000000
    ).toString();

    // Generate a 10-digit random PNR number
    const pnrNumber = Math.floor(
      1000000000 + Math.random() * 9000000000
    ).toString();

    // Get Train Name from the request body
    const trainName = req.body.trainName;

    // Save booking data to MongoDB
    const newBooking = new Booking({
      userId,
      trainNumber,
      date,
      goingFrom,
      goingTo,
      passengers,
      seatNumbers,
      totalAmount,
      selectedClass,
      transactionId,
      pnrNumber,
      trainName,
    });

    await newBooking.save();

    res.json({
      success: true,
      message: "Booking saved successfully",
      transactionId,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//fetch the data from booking table
app.use(cors());
app.use(express.json());

// Express route to fetch bookings by user ID
app.get("/api/bookings/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await Booking.find({ userId: userId }).sort({
      createdAt: 1,
    });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//cancel booking code

app.delete("/api/cancelBooking/:pnrNumber", async (req, res) => {
  try {
    const pnrNumber = req.params.pnrNumber;

    // Find the booking document by PNR number and delete it
    const deletedBooking = await Booking.findOneAndDelete({ pnrNumber });

    if (!deletedBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    res.json({ success: true, message: "Booking canceled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
//
app.get("/api/booking/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the booking in the database by ID
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Send the booking details as JSON
    res.json(booking);
  } catch (error) {
    console.error("Error fetching booking details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
