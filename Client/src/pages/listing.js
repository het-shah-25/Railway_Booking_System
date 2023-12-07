import React from "react";

import Footer from "./footer";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/between.css";

const ListPage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { from, to, date, trains } = location.state || {};
  const handleBooking = (from, to, date, trainNo, trainName) => {
    navigate("/booking", {
      state: { from, to, date, trainNo, trainName },
    });
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
      <div className="osahan-listing p-0 m-0 row border-top">
        {from && to && date && trains && trains.length > 0 ? (
          <div className="p-2 border-bottom w-100">
            <div className="bg-white border border-warning rounded-1 shadow-sm p-2">
              <div className="row mx-0 px-1">
                <div className="col-4 p-0">
                  <small className="text-muted mb-1 f-10 pr-1">
                    GOING FROM
                  </small>
                  <p className="small mb-0">{from}</p>
                </div>
                <div className="col-4 p-0">
                  <small className="text-muted mb-1 f-10 pr-1">GOING TO</small>
                  <p className="small mb-0">{to}</p>
                </div>
                <div className="col-4 p-0">
                  <small className="text-muted mb-1 f-10 pr-1">DATE</small>
                  <p className="small mb-0">{date}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {trains && trains.length > 0 && (
          <table className="train-table">
            <thead>
              {" "}
              <tr>
                <th>Train No</th>
                <th>Train Name</th>
                <th>Source Station</th>
                <th>Destination Station</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th>Travel Time</th>
                {/* <th>Running Days</th> */}
                <th>Booking</th>
              </tr>
            </thead>
            <tbody>
              {trains.map((train) => (
                <tr key={train.train_base.train_no}>
                  <td>{train.train_base.train_no}</td>
                  <td>{train.train_base.train_name}</td>
                  <td>{train.train_base.source_stn_name}</td>
                  <td>{train.train_base.dstn_stn_name}</td>
                  <td>{train.train_base.from_time}</td>
                  <td>{train.train_base.to_time}</td>
                  <td>{train.train_base.travel_time}</td>
                  {/* <td>{train.train_base.running_days}</td> */}
                  <td>
                    {" "}
                    <button
                      type="button"
                      className="btn btn-danger btn-block osahanbus-btn2 rounded-1"
                      onClick={() =>
                        handleBooking(
                          from,
                          to,
                          date,
                          train.train_base.train_no,
                          train.train_base.train_name
                        )
                      }
                    >
                      Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ListPage;
