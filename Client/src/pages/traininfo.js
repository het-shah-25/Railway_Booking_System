import React, { useState } from "react";
import axios from "axios";
import "./css/TrainData.css";

function TrainData() {
  const [trainNumber, setTrainNumber] = useState("");
  const [trainData, setTrainData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTrainData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/getTrain?trainNo=${trainNumber}`
      );
      if (response.data.success) {
        setTrainData(response.data.data);
        setError("");
      } else {
        setError(response.data.data); // Set specific error message received from the API
        setTrainData(null); // Reset train data
      }
    } catch (error) {
      setError("Please Enter train Number");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="osahan-listing">
      <div class="osahan-header-nav shadow-sm p-3 d-flex align-items-center bg-danger">
        <h5 class="font-weight-normal mb-0 text-white">
          <a class="text-danger" href="/home">
            <i class="icofont-rounded-left"></i>
          </a>
        </h5>
      </div>
      <h3 className="centered-heading">Train Information</h3>
      <div className="p-3">
        {/* <h2 className="centered-heading">Train Information</h2> */}
        <form action="#">
          <div className="form-group">
            <input
              type="text"
              id="trainNumber"
              className="form-control"
              placeholder="Enter Train Number"
              value={trainNumber}
              onChange={(e) => setTrainNumber(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-danger btn-block osahanbus-btn mb-3 rounded-1 mt-4"
            onClick={fetchTrainData}
            disabled={loading}
          >
            {loading ? "Loading..." : "SEARCH"}
          </button>
        </form>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {trainData && (
        <div className="centered-content">
          <table
            className="train-table"
            style={{
              marginTop: "20px",
              borderCollapse: "collapse",
              width: "80%",
              maxWidth: "500px",
              textAlign: "left",
            }}
          >
            <tbody>
              {" "}
              <tr>
                <td>Train Number:</td>
                <td>{trainData.train_no}</td>
              </tr>
              <tr>
                <td>Train Name:</td>
                <td>{trainData.train_name}</td>
              </tr>
              <tr>
                <td>From Station Name:</td>
                <td>{trainData.from_stn_name}</td>
              </tr>
              <tr>
                <td>From Station Code:</td>
                <td>{trainData.from_stn_code}</td>
              </tr>
              <tr>
                <td>To Station Name:</td>
                <td>{trainData.to_stn_name}</td>
              </tr>
              <tr>
                <td>To Station Code:</td>
                <td>{trainData.to_stn_code}</td>
              </tr>
              <tr>
                <td>Departure Time:</td>
                <td>{trainData.from_time}</td>
              </tr>
              <tr>
                <td>Arrival Time:</td>
                <td>{trainData.to_time}</td>
              </tr>
              <tr>
                <td>Travel Time:</td>
                <td>{trainData.travel_time}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TrainData;
