// BookingDetail.js
import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const BookingDetail = () => {
  const location = useLocation();
  const bookingData = location.state?.bookingData || {};
  const bookingDetailRef = useRef(null);

  const downloadPdf = () => {
    const input = bookingDetailRef.current;

    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgWidth = 208;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 0, 0, imgWidth, imgHeight);
        pdf.save("bookingdetails.pdf");
      });
    }
  };
  return (
    <div class="payment padding-bt" id="bookingdetail">
      <div class="osahan-header-nav shadow-sm p-3 d-flex align-items-center bg-danger">
        <h5 class="font-weight-normal mb-0 text-white">
          <a class="text-danger mr-3" href="/myticket">
            <i class="icofont-rounded-left"></i>
          </a>
          Booking Details
        </h5>
      </div>
      <div ref={bookingDetailRef}>
        <div class="your-ticket pt-2">
          <div class="p-3">
            <div class="bg-white rounded-1 shadow-sm p-2 mb-2">
              <div class="row mx-0 px-1">
                <div class="col-4 p-0">
                  <small class="text-muted mb-1 f-10 pr-1">GOING FROM</small>
                  <p class="small mb-0"> {bookingData.goingFrom}</p>
                </div>
                <div class="col-4 p-0">
                  <small class="text-muted mb-1 f-10 pr-1">GOING TO</small>
                  <p class="small mb-0"> {bookingData.goingTo}</p>
                </div>
                <div class="col-4 p-0">
                  <small class="text-muted mb-1 f-10 pr-1">DATE</small>
                  <p class="small mb-0"> {bookingData.date}</p>
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
                <p className="small mb-0 ml-auto l-hght-14">
                  {bookingData.trainNumber}
                </p>
              </div>
              <div className="l-hght-10 d-flex align-items-center my-2">
                <small className="text-muted mb-0 pr-1">Train Name</small>
                <p className="small mb-0 ml-auto l-hght-14">
                  {bookingData.trainName}
                </p>
              </div>
              <div className="l-hght-10 d-flex align-items-center my-2">
                <small className="text-muted mb-0 pr-1">Class</small>
                <p className="small mb-0 ml-auto l-hght-14">
                  {bookingData.selectedClass}
                </p>
              </div>
              <div className="l-hght-10 d-flex align-items-center my-2">
                <small className="text-muted mb-0 pr-1">Total Passengers</small>
                <p className="small mb-0 ml-auto l-hght-14">
                  {" "}
                  {bookingData.passengers.length}
                </p>
              </div>
              <div className="l-hght-10 d-flex align-items-center my-2">
                <small className="text-muted mb-0 pr-1">PNR</small>
                <p className="small mb-0 ml-auto l-hght-14">
                  {bookingData.pnrNumber}
                </p>
              </div>
              <div className="l-hght-10 d-flex align-items-center my-2">
                <small className="text-muted mb-0 pr-1">Transaction Id</small>
                <p className="small mb-0 ml-auto l-hght-14">
                  {bookingData.transactionId}
                </p>
              </div>
              <div className="l-hght-10 d-flex align-items-center mt-3">
                <p className="mb-0 pr-1 font-weight-bold">Amount Paid</p>
                <p className="mb-0 ml-auto l-hght-14 text-danger font-weight-bold">
                  {bookingData.totalAmount}₹
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
              {bookingData.passengers.map((passenger, index) => (
                <tr key={index}>
                  <td>{passenger.fullName}</td>
                  <td>{passenger.age}</td>
                  <td>{passenger.gender}</td>
                  <td>{bookingData.seatNumbers[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="fixed-bottom p-3">
          <div className="footer-menu row m-0 px-1 bg-white shadow rounded-2">
            <div className="col-12 p-0 text-center">
              <a className="home text-danger py-3" onClick={downloadPdf}>
                <span className="icofont-file-pdf h5" />
                <p className="mb-0 small">Download Pdf</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
