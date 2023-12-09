// BookingModel.js

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }, // Reference to User model
    trainNumber: String,
    date: Date,
    goingFrom: String,
    goingTo: String,
    passengers: Array,
    seatNumbers: Array,
    totalAmount: Number,
    selectedClass: String,
    bookingStatus: Number,
    transactionId: String,
    pnrNumber: String,
});

const bookingModel = mongoose.model('booking', bookingSchema);

module.exports = bookingModel;
