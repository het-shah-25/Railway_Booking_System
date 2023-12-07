import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";
import { message } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const Myticketpage = () => {
  const [sortedBookings, setSortedBookings] = useState([]);
  const [userId, setUserId] = useState("");
  const iconStyle = {
    fontSize: "24px",
    color: "white",
    cursor: "pointer",
  };
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
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
    const fetchBookings = async () => {
      try {
        if (userId) {
          const response = await fetch(`/api/bookings/${userId}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();

          // Sort the bookings based on the date property in ascending order
          const sortedData = data.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );

          setSortedBookings(sortedData);
        }
      } catch (error) {
        console.error("Error fetching or sorting bookings:", error);
      }
    };

    fetchBookings();
  }, [userId]);

  const handleCancelTicket = async (pnrNumber) => {
    console.log(pnrNumber);
    try {
      const response = await fetch(`/api/cancelBooking/${pnrNumber}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to cancel ticket");
      }

      const responseData = await response.json();

      // Display success message
      message.success("Ticket canceled successfully");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error canceling ticket:", error);
      // Display error message
      message.error("Failed to cancel ticket");
    }
  };
  const navigate = useNavigate();

  const handleBookingDetailClick = (booking) => {
    // Use React Router to navigate to the booking detail page
    navigate("/booking-detail", { state: { bookingData: booking } });
  };
  return (
    <div className="my-ticket padding-bt">
      <div className="osahan-header-nav shadow-sm p-3 d-flex align-items-center bg-danger">
        <h5 className="font-weight-normal mb-0 text-white">
          <a className="text-danger mr-3" href="/home">
            <i className="icofont-rounded-left" />
          </a>
          Your Bookings
        </h5>
        <div style={{ flex: 1 }}></div>
        <div onClick={logout} style={iconStyle}>
          <LogoutOutlined />
        </div>
      </div>
      {/* You Ticket */}
      {sortedBookings.map((booking) => (
        <div className="your-ticket border-top row m-0 p-3">
          {/* My Ticket Item */}
          <div className="bg-white rounded-1 shadow-sm p-3 mb-3 w-100">
            <a href="/">
              {" "}
              {/*  Class Name */}
              <div className="d-flex align-items-center mb-2">
                <small className="text-muted"> {booking.selectedClass}</small>
                <small className="text-success ml-auto f-10">
                  {" "}
                  {booking.bookingStatus === 0 ? "CONFIRMED" : "WAITING"}
                </small>
              </div>
              <h6 className="mb-3 l-hght-18 font-weight-bold text-dark">
                {booking.trainNumber}-{booking.trainName}
              </h6>
            </a>
            <div className="row mx-0 mb-3">
              <div className="col-4 p-0">
                <small className="text-muted mb-1 f-10 pr-1">GOING FROM</small>
                <p className="small mb-0 l-hght-14"> {booking.goingFrom}</p>
              </div>
              <div className="col-4 p-0">
                <small className="text-muted mb-1 f-10 pr-1">TO</small>
                <p className="small mb-0 l-hght-14"> {booking.goingTo}</p>
              </div>
              <div className="col-4 p-0">
                <small className="text-muted mb-1 f-10 pr-1">Date</small>
                <p className="small mb-0 l-hght-14"> {booking.date}</p>
              </div>
            </div>
            <div className="list_item d-flex col-12 m-0 p-3 bg-white shadow-sm rounded-1 shadow-sm">
              <div className="d-flex mb-auto">
                <img src="img/qr-code.png" className="img-fluid osahan-qr" />
              </div>
              <div className="d-flex w-100">
                <div className="bus_details w-100 pl-3">
                  <p className="mb-2 l-hght-18 font-weight-bold">More info.</p>
                  <div className="l-hght-10 d-flex align-items-center my-2">
                    <small className="text-muted mb-0 pr-1">Passenger</small>
                    <p className="small mb-0 ml-auto l-hght-14">
                      {booking.passengers.length}
                    </p>
                  </div>
                  <div className="l-hght-10 d-flex align-items-center my-2">
                    <small className="text-muted mb-0 pr-1">Seat Number</small>
                    <p className="small mb-0 ml-auto l-hght-14">
                      {booking.seatNumbers.join(", ")}
                    </p>
                  </div>
                  <div className="l-hght-10 d-flex align-items-center my-2">
                    <small className="text-muted mb-0 pr-1">
                      Transaction Id
                    </small>
                    <p className="small mb-0 ml-auto l-hght-14">
                      {" "}
                      {booking.transactionId}
                    </p>
                  </div>
                  <div className="l-hght-10 d-flex align-items-center my-2">
                    <small className="text-muted mb-0 pr-1">PNR</small>
                    <p className="small mb-0 ml-auto l-hght-14">
                      {" "}
                      {booking.pnrNumber}
                    </p>
                  </div>
                  <div className="l-hght-10 d-flex align-items-center mt-3">
                    <p className="mb-0 pr-1 font-weight-bold">Amount Paid</p>
                    <p className="mb-0 ml-auto l-hght-14 text-danger font-weight-bold">
                      {booking.totalAmount} ₹
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-danger btn-block osahanbus-btn2 rounded-1"
              onClick={() => handleCancelTicket(booking.pnrNumber)}
            >
              Cancel Ticket
            </button>
            <button
              type="button"
              className="btn btn-primary btn-block osahanbus-btn2 rounded-1"
              onClick={() => handleBookingDetailClick(booking)}
            >
              View Details
            </button>
          </div>
        </div>
      ))}
      <Footer></Footer>{" "}
    </div>
  );
};
export default Myticketpage;
