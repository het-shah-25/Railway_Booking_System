import React from "react";
import { useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Footer from "./footer";
import jsonData from "./json/Railway_Stations.json";
import { LogoutOutlined } from "@ant-design/icons";
const Home = () => {
  const iconStyle = {
    fontSize: "24px",
    color: "white",
    cursor: "pointer",
  };
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [trains, setTrains] = useState([]);
  const [error, setError] = useState(null);

  const options = useMemo(() => {
    return jsonData.data.map((station) => (
      <option key={station.code} value={station.code}>
        {station.name}
      </option>
    ));
  }, [jsonData.data]);
  const fetchTrains = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/betweenStationsdate?from=${from}&to=${to}&date=${date}`
      );

      if (response.data.success) {
        if (response.data.data.length === 0) {
          setError("No trains found for the selected route and date.");
        } else {
          setTrains(response.data.data);
          navigate("/listing", {
            state: {
              from: from,
              to: to,
              date: date,
              trains: response.data.data,
            },
          });
        }
      } else {
        setError("No trains found for the selected route and date.");
      }
    } catch (error) {
      setError("Error fetching data. Please try again later.");
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTrains();
  };
  const handleFromChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === to) {
      setError("From and To stations cannot be the same");
    } else {
      setFrom(selectedValue);
      setError("");
    }
  };

  const handleToChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === from) {
      setError("From and To stations cannot be the same");
    } else {
      setTo(selectedValue);
      setError("");
    }
  };

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Add leading zeros if the month or day is a single digit
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  }

  return (
    <div className="osahan-verification padding-bt">
      <div className="p-3 shadow bg-danger danger-nav osahan-home-header2">
        <div className="font-weight-normal mb-0 d-flex align-items-center">
          <img className="bg-white" src="img\logo-5931c0b2.svg" alt="Logo" />
          <span className="headName">Railway Booking</span>
          <div style={{ flex: 1 }}></div>
          <div onClick={logout} style={iconStyle}>
            <LogoutOutlined />
          </div>
        </div>
      </div>

      <div className="bg-danger px-3 pb-3">
        <div className="bg-white rounded-1 p-3">
          {error && <div className="alert alert-danger">{error}</div>}{" "}
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group border-bottom pb-2">
              <label className="mb-2">
                <span className="icofont-search-map text-danger"></span> From
              </label>
              <br />
              <select
                className="js-example-basic-single form-control"
                value={from}
                // onChange={(e) => setFrom(e.target.value)}
                onChange={handleFromChange}
              >
                {jsonData.data.map((station) => (
                  <option key={station.code} value={station.code}>
                    {station.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group border-bottom pb-2">
              <label className="mb-2">
                <span className="icofont-google-map text-danger"></span> To
              </label>
              <br />
              <select
                className="js-example-basic-single form-control"
                value={to}
                // onChange={(e) => setTo(e.target.value)}
                onChange={handleToChange}
              >
                {jsonData.data.map((station) => (
                  <option key={station.code} value={station.code}>
                    {station.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group border-bottom pb-1">
              <label className="mb-2">
                <span className="icofont-ui-calendar text-danger"></span> Date
              </label>
              <br />
              <input
                name="date"
                className="form-control border-0 p-0"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={getCurrentDate()} // Set the min attribute to the current date
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-danger btn-block osahanbus-btn rounded-1"
            >
              Search
            </button>
          </form>
        </div>
        <div className="p-3 bg-danger marginButton">
          <div className="row m-0 ">
            <div className="col-6 py-1 pr-1 pl-0">
              <div className="p-2 bg-white shadow-sm rounded-1 centeredText">
                <Link to="/trainroute">
                  <img
                    className="img-fluid"
                    src="img/train-schedule.svg"
                    alt=""
                    style={{ width: "25px" }}
                  />
                  <span className="margined" style={{ fontSize: "20px" }}>
                    Train Schedule
                  </span>
                </Link>
              </div>
            </div>
            <div className="col-6 py-1 pl-1 pr-0">
              <div className="p-2 bg-white shadow-sm rounded-1">
                <Link to="/traininfo">
                  <img
                    className="img-fluid"
                    src="img/train-info.svg"
                    alt=""
                    style={{ width: "25px" }}
                  />
                  <span className="margined" style={{ fontSize: "20px" }}>
                    Train Information
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="row m-0">
          <div className="col-6 py-1 pr-1 pl-0">
            <img src="img/train_l.jfif" style={{ width: "100%" }} alt="" />
          </div>
          <div className="col-6 py-1 pr-1 pl-0">
            <img src="img/train_r.jpg" style={{ width: "100%" }} alt="" />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
