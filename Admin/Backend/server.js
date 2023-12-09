const express = require("express");
const app = express();
const mongoose = require("./DatabaseConnection.js");
const cors = require("cors");
const userModel = require("./models/UserModel.js");
const bookingModel = require("./models/BookingModel.js");

app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

// Define the route to fetch the number of users
app.get('/api/users', async (req, res) => {
    try {
        const usersCount = await userModel.countDocuments();
        res.json({ usersCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/total-earnings', async (req, res) => {
    try {
        // Use the aggregation framework to calculate the total amount
        const result = await bookingModel.aggregate([
            { $group: { _id: null, totalAmount: { $sum: "$totalAmount" } } },
        ]);

        const totalEarnings = result.length > 0 ? result[0].totalAmount : 0;
        res.json({ totalEarnings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/api/viewUsers', async (req, res) => {
    try {
        const users = await userModel.find({}, { _id: 1, firstname: 1, lastname: 1, email: 1, isVerified: 1 });
        res.json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/api/viewBookings', async (req, res) => {
    try {
        const bookings = await bookingModel.find().populate('userId', 'firstname lastname');
        res.json({ bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Assuming you have a model named 'Booking' and it contains 'goingFrom' and 'goingTo' fields

app.get('/api/mostActiveRoute', async (req, res) => {
    try {
        const mostActiveRoutes = await bookingModel.aggregate([
            {
                $group: {
                    _id: { goingFrom: '$goingFrom', goingTo: '$goingTo' },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 5 // Adjust the limit as needed
            }
        ]);

        res.json({ mostActiveRoutes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/bookingDistribution', async (req, res) => {
    try {
        const bookingDistribution = await bookingModel.aggregate([
            { $group: { _id: '$selectedClass', count: { $sum: 1 } } },
        ]);

        res.json({ bookingDistribution });
    } catch (error) {
        console.error('Error fetching booking distribution:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
