import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
const PaymentPage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const {
    from,
    to,
    date,
    trainNo,
    trainName,
    passengers,
    basePrice,
    numPassengers,
    selectedClass,
    finalTotal,
  } = location.state || {};
  function generateSeatNumbers(type, numPassengers) {
    const classMap = {
      "SL - Sleeper": "SL",
      "3E - 3 Ac Economy": "E",
      "3A - Third Ac": "A",
      "2A - Second Ac": "B",
    };

    if (!classMap[type] || numPassengers <= 0) {
      return "Invalid input";
    }

    const seatPrefix = classMap[type];
    const maxSeats = 60;
    const seatNumbers = [];

    // Generate a random starting point
    let startingSeat = Math.floor(Math.random() * 30) + 1;

    for (let i = 0; i < numPassengers; i++) {
      const seatNumber = seatPrefix + (startingSeat + i);

      if (seatNumbers.includes(seatNumber) || startingSeat + i > maxSeats) {
        return "Not enough available seats";
      }

      seatNumbers.push(seatNumber);
    }

    return seatNumbers;
  }
  const seatNumbers = generateSeatNumbers(selectedClass, numPassengers);
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

  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = async () => {
    const cardNumberRegex = /^\d{16}$/;
    const expiryMonthRegex = /^\d{1,2}$/;
    const cvvRegex = /^\d{3}$/;

    if (!cardNumber.match(cardNumberRegex)) {
      message.error("Invalid card number. Please enter a 16-digit number.");
      return;
    }

    if (
      !expiryMonth.match(expiryMonthRegex) ||
      parseInt(expiryMonth) < 1 ||
      parseInt(expiryMonth) > 12
    ) {
      message.error("Invalid expiry month. Please enter a valid month (1-12).");
      return;
    }

    if (!cvv.match(cvvRegex)) {
      message.error("Invalid CVV. Please enter a 3-digit number.");
      return;
    }

    try {
      const response = await axios.post("/api/saveBooking", {
        userId,
        trainNumber: trainNo,
        trainName: trainName,
        date,
        goingFrom: from,
        goingTo: to,
        passengers,
        seatNumbers,
        totalAmount: finalTotal,
        selectedClass,
      });

      if (response.data.success) {
        message.success(
          `Booking successful! Transaction ID: ${response.data.transactionId}`
        );
        navigate("/myticket");
        // You may want to redirect the user or perform other actions here
      } else {
        message.error("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during booking:", error);
      message.error("Booking failed. Please try again.");
    }
  };

  return (
    <div class="payment padding-bt">
      <div class="osahan-header-nav shadow-sm p-3 d-flex align-items-center bg-danger">
        <h5 class="font-weight-normal mb-0 text-white">
          <a class="text-danger mr-3" href="/home">
            <i class="icofont-rounded-left"></i>
          </a>
          Payment
        </h5>
      </div>
      <div class="your-ticket pt-2">
        <div class="p-3">
          <div class="bg-white rounded-1 shadow-sm p-2 mb-2">
            <div class="row mx-0 px-1">
              <div class="col-4 p-0">
                <small class="text-muted mb-1 f-10 pr-1">GOING FROM</small>
                <p class="small mb-0"> {from}</p>
              </div>
              <div class="col-4 p-0">
                <small class="text-muted mb-1 f-10 pr-1">GOING TO</small>
                <p class="small mb-0"> {to}</p>
              </div>
              <div class="col-4 p-0">
                <small class="text-muted mb-1 f-10 pr-1">DATE</small>
                <p class="small mb-0"> {date}</p>
              </div>
            </div>
          </div>
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
              <small className="text-muted mb-0 pr-1">Train Number</small>
              <p className="small mb-0 ml-auto l-hght-14">{trainNo}</p>
            </div>
            <div className="l-hght-10 d-flex align-items-center my-2">
              <small className="text-muted mb-0 pr-1">Train Name</small>
              <p className="small mb-0 ml-auto l-hght-14">{trainName}</p>
            </div>
            <div className="l-hght-10 d-flex align-items-center my-2">
              <small className="text-muted mb-0 pr-1">Class</small>
              <p className="small mb-0 ml-auto l-hght-14">{selectedClass}</p>
            </div>
            <div className="l-hght-10 d-flex align-items-center my-2">
              <small className="text-muted mb-0 pr-1">Total Passengers</small>
              <p className="small mb-0 ml-auto l-hght-14">{numPassengers}</p>
            </div>
            <div className="l-hght-10 d-flex align-items-center my-2">
              <small className="text-muted mb-0 pr-1">Ticket Price</small>
              <p className="small mb-0 ml-auto l-hght-14">{basePrice} ₹</p>
            </div>
            <div className="l-hght-10 d-flex align-items-center mt-3">
              <p className="mb-0 pr-1 font-weight-bold">Amount Paid</p>
              <p className="mb-0 ml-auto l-hght-14 text-danger font-weight-bold">
                {finalTotal}₹
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="list_item d-flex rounded-1 col-12 m-0 bg-white shadow-sm mb-3">
        <table className="table table-bordered mt-1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Seat No</th>
            </tr>
          </thead>
          <tbody>
            {passengers.map((passenger, index) => (
              <tr key={index}>
                <td>{passenger.fullName}</td>
                <td>{passenger.age}</td>
                <td>{passenger.gender}</td>
                <td>{seatNumbers[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="payment-borrad shadow bg-white m-0 rounded-1 p-3">
        <div className="d-flex small">
          <p>Total Payable</p>
          <p className="ml-auto font-weight-bold text-danger">{finalTotal}₹</p>
        </div>
        <div className="d-flex small">
          <form className="w-100" action="javascript:;">
            <div className="form-group mb-2">
              <div className="d-flex align-items-start">
                <label
                  htmlFor="exampleInputEmail1"
                  className="mb-1 small text-muted"
                >
                  Card Number
                </label>
                <img
                  src="img/master-card.png"
                  className="img-fluid ml-auto rounded"
                />
              </div>
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="1234 5678 9145 4589"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group row mb-3">
              <div className="col-8">
                <label
                  htmlFor="exampleInputmondate1"
                  className="mb-1 small text-muted"
                >
                  Month / Date
                </label>
                <div className="d-flex border rounded">
                  <input
                    type="number"
                    className="form-control text-center form-control-sm border-0 px-1"
                    placeholder="DD"
                    id="exampleInputmondate1"
                    aria-describedby="mondateHelp"
                  />
                  <span className="pt-2">/</span>
                  <input
                    type="number"
                    className="form-control text-center form-control-sm border-0 px-1"
                    placeholder="MM"
                    id="exampleInputmondate1"
                    aria-describedby="mondateHelp"
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-4">
                <label
                  htmlFor="exampleInputcvv1"
                  className="mb-1 small text-muted"
                >
                  CVV
                </label>
                <input
                  type="number"
                  className="form-control text-center form-control-sm"
                  placeholder={"000"}
                  id="exampleInputcvv1"
                  aria-describedby="cvvHelp"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-danger btn-block"
              onClick={handlePayment}
            >
              Pay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
