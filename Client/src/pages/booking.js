import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";

const generateRandomPrice = () => {
  let rnd = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
  return rnd;
};

var mainPrice = generateRandomPrice();

const BookingPage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { from, to, date, trainNo, trainName } = location.state || {};
  const [selectedClass, setSelectedClass] = useState("SELECT");
  const [passengers, setPassengers] = useState([
    { fullName: "", age: "", gender: "Male" },
  ]);
  const [basePrice, setBasePrice] = useState(0);
  const [numPassengers, setNumPassengers] = useState(1);

  const handleAddPassenger = () => {
    setPassengers([...passengers, { fullName: "", age: "", gender: "Male" }]);
    setNumPassengers(numPassengers + 1);
  };

  const handleRemovePassenger = (index) => {
    const updatedPassengers = [...passengers];
    updatedPassengers.splice(index, 1);
    setPassengers(updatedPassengers);
    setNumPassengers(numPassengers - 1);
  };

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  const calculateTicketPrice = (selectedClass) => {
    // Set the base price for the selected class

    let price = mainPrice;
    if (selectedClass === "SL - Sleeper") {
      price += 100;
    } else if (selectedClass === "2A - Second Ac") {
      price += 300;
    } else if (selectedClass === "3E - 3 Ac Economy") {
      price += 400;
    } else if (selectedClass === "3A - Third Ac") {
      price += 500;
    } else if (selectedClass === "SELECT") {
      price = 0;
    }
    setSelectedClass(selectedClass);
    setBasePrice(price);
  };

  const calculateFinalTotal = () => {
    // Calculate the total price based on the base price and the number of passengers
    return basePrice * numPassengers;
  };

  const handleConfirmBooking = () => {
    // Validate if a class is selected
    if (selectedClass === "SELECT") {
      message.error("Select the class first");
      return;
    }

    // Validate if all passengers have valid information
    for (const passenger of passengers) {
      if (!passenger.fullName.trim()) {
        message.error("Full Name is required for all passengers");
        return;
      }

      if (!/^[a-zA-Z\s]+$/.test(passenger.fullName.trim())) {
        message.error("Full Name should contain only letters and spaces");
        return;
      }

      if (!passenger.age) {
        message.error("Age is required for all passengers");
        return;
      }

      if (!/^\d+$/.test(passenger.age)) {
        message.error("Age should contain only numbers");
        return;
      }
    }

    // If all validations pass, navigate to the PaymentPage
    navigate("/payment", {
      state: {
        from,
        to,
        date,
        trainNo,
        trainName,
        passengers,
        basePrice,
        numPassengers,
        selectedClass,
        finalTotal: calculateFinalTotal(),
      },
    });
  };

  return (
    <div class="seat-select padding-bt">
      <div class="osahan-header-nav shadow-sm p-3 d-flex align-items-center bg-danger">
        <h5 class="font-weight-normal mb-0 text-white">
          <a class="text-danger mr-3" href="/home">
            <i class="icofont-rounded-left"></i>
          </a>
        </h5>
      </div>
      <div className="ticket p-3">
        <h6 className="mb-1 font-weight-bold text-dark">
          Train Name : {trainName}
        </h6>
        <div className="bg-white rounded-1 shadow-sm p-3 mb-3 w-100">
          <div className="row mx-0 mb-3">
            <div className="col-6 p-0">
              <small className="text-muted mb-1 f-10 pr-1">Train Number</small>
              <p className="small mb-0 l-hght-14"> {trainNo}</p>
            </div>
            <div className="col-6 p-0">
              <small className="text-muted mb-1 f-10 pr-1">Date</small>
              <p className="small mb-0 l-hght-14"> {date}</p>
            </div>
          </div>
          <div className="row mx-0 mb-3">
            <div className="col-6 p-0">
              <small className="text-muted mb-1 f-10 pr-1">Going From</small>
              <p className="small mb-0 l-hght-14"> {from}</p>
            </div>
            <div className="col-6 p-0">
              <small className="text-muted mb-1 f-10 pr-1">Going To</small>
              <p className="small mb-0 l-hght-14"> {to}</p>
            </div>
          </div>
        </div>
        <div className="form-group border-bottom pb-2">
          <label htmlFor="exampleFormControlSelect1" className="mb-2">
            <span className="icofont-search-map text-danger" /> class
          </label>
          <br />
          <select
            className="js-example-basic-single form-control"
            name="state"
            onChange={(e) => calculateTicketPrice(e.target.value)}
          >
            <option value="SELECT">SELECT</option>
            <option value="SL - Sleeper">SL - Sleeper</option>
            <option value="2A - Second Ac">2A - Second Ac</option>
            <option value="3E - 3 Ac Economy">3E - 3 Ac Economy</option>
            <option value="3A - Third Ac">3A - Third Ac</option>
          </select>
        </div>

        {/* Book Passenger  */}
        <div className="ticket p-3">
          <button
            type="button"
            className="btn btn-danger rounded-1"
            onClick={handleAddPassenger}
          >
            Add Passenger
          </button>
          <form>
            {passengers.map((passenger, index) => (
              <div key={index} className="mb-3">
                <div className="form-group">
                  <label className="text-muted f-10 mb-1">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Full Name"
                    value={passenger.fullName}
                    onChange={(e) =>
                      handlePassengerChange(index, "fullName", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="text-muted f-10 mb-1">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Age"
                    value={passenger.age}
                    onChange={(e) =>
                      handlePassengerChange(index, "age", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="text-muted f-10 mb-1">Gender</label>
                  <div>
                    <label className="mr-3">
                      <input
                        type="radio"
                        value="Male"
                        checked={passenger.gender === "Male"}
                        onChange={() =>
                          handlePassengerChange(index, "gender", "Male")
                        }
                      />{" "}
                      Male
                    </label>
                    <label className="mr-3">
                      <input
                        type="radio"
                        value="Female"
                        checked={passenger.gender === "Female"}
                        onChange={() =>
                          handlePassengerChange(index, "gender", "Female")
                        }
                      />{" "}
                      Female
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Transgender"
                        checked={passenger.gender === "Transgender"}
                        onChange={() =>
                          handlePassengerChange(index, "gender", "Transgender")
                        }
                      />{" "}
                      Transgender
                    </label>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => handleRemovePassenger(index)}
                >
                  Remove Passenger
                </button>
              </div>
            ))}
          </form>
        </div>
        {/* Payment Information */}
        <div className="list_item d-flex col-12 m-0 p-3 bg-white shadow-sm rounded-1 shadow-sm">
          <div className="d-flex mb-auto">
            <img src="img/qr-code.png" className="img-fluid osahan-qr" />
          </div>
          <div className="d-flex w-100">
            <div className="bus_details w-100 pl-3">
              <p className="mb-2 l-hght-18 font-weight-bold">More info.</p>
              <div className="l-hght-10 d-flex align-items-center my-2">
                <small className="text-muted mb-0 pr-1">Passenger</small>
                <p className="small mb-0 ml-auto l-hght-14">{numPassengers}</p>
              </div>
              <div className="l-hght-10 d-flex align-items-center my-2">
                <small className="text-muted mb-0 pr-1">Ticket Price</small>
                <p className="small mb-0 ml-auto l-hght-14"> {basePrice}₹</p>
              </div>
              <div className="l-hght-10 d-flex align-items-center mt-3">
                <p className="mb-0 pr-1 font-weight-bold">Amount Paid</p>
                <p className="mb-0 ml-auto l-hght-14 text-danger font-weight-bold">
                  {calculateFinalTotal()}₹
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed-bottom view-seatbt p-3">
          <button
            type="button"
            className="btn btn-danger btn-block d-flex align-items-center osahanbus-btn rounded-1"
            onClick={handleConfirmBooking}
          >
            <span className="text-left l-hght-14">
              {calculateFinalTotal()}₹
              <br />
              <small className="f-10 text-white-50">
                Passenger: {numPassengers}{" "}
              </small>
            </span>
            <span className="font-weight-bold ml-auto">CONFIRM</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
