import React, { useState, useEffect } from "react";

const BookingDetails = () => {
  const [bookings, setBookings] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    try {
      const storedUserData = localStorage.getItem("user");
      const parsedUserData = JSON.parse(storedUserData);

      if (parsedUserData && parsedUserData._id) {
        console.log("Stored User ID:", parsedUserData._id);
        setUserId(parsedUserData._id);
      } else {
        console.error("Invalid user data format");
      }
    } catch (error) {
      console.error("Error retrieving user ID:", error);
    }
  }, []);

  useEffect(() => {
    // Fetch user's bookings using the user ID
    fetch(`/api/bookings/${userId}`)
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Your Bookings</h1>
      <table>
        <thead>
          <tr>
            <th>Train Number</th>
            <th>Date</th>
            <th>From</th>
            <th>To</th>
            {/* Add more headers based on your data structure */}
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.trainNumber}</td>
              <td>{booking.date}</td>
              <td>{booking.goingFrom}</td>
              <td>{booking.goingTo}</td>
              {/* Add more cells based on your data structure */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default BookingDetails;
