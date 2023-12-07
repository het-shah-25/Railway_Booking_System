import React, { useState } from "react";
import axios from "axios";
import "./css/Trainroute.css";

const TrainRoute = () => {
  const [trainNo, setTrainNumber] = useState("");
  const [routeData, setTrainData] = useState(null); // Initialize routeData as null
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTrainRoute = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/getRoute?trainNo=${trainNo}`
      );
      if (response.data.success) {
        setTrainData(response.data.data);
        setError(null); // Reset error state if successful response
      } else {
        setError(response.data.data); // Set specific error message received from the API
        setTrainData(null);
      }
    } catch (error) {
      setError("Error fetching data");
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
      <br></br>
      <h3 className="centered-heading"> Train Schedule</h3>
      <div className="p-3">
        {/* <h2 className="centered-heading">Train Information</h2> */}
        <form action="#">
          <div className="form-group">
            <input
              type="text"
              id="trainNumber"
              className="form-control"
              placeholder="Enter Train Number"
              value={trainNo}
              onChange={(e) => setTrainNumber(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-danger btn-block osahanbus-btn mb-3 rounded-1 mt-4"
            onClick={fetchTrainRoute}
            disabled={loading}
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </form>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {routeData !== null && routeData.length > 0 && (
        <table className="route-table">
          <thead>
            <tr>
              <th>Station Name</th>
              <th>Station Code</th>
              <th>Arrival</th>
              <th>Departure</th>
              <th>Distance (in km)</th>
              <th>Day</th>
              <th>Zone</th>
            </tr>
          </thead>
          <tbody>
            {routeData.map((station, index) => (
              <tr key={index}>
                <td>{station.source_stn_name}</td>
                <td>{station.source_stn_code}</td>
                <td>{station.arrive}</td>
                <td>{station.depart}</td>
                <td>{station.distance}</td>
                <td>{station.day}</td>
                <td>{station.zone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default TrainRoute;
