var express = require("express");
var router = express.Router();
var rp = require("request-promise");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/getTrain", function (req, res) {
  const trainNo = req.query.trainNo;

  if (!trainNo) {
    return res.status(400).send("Train number is missing in the request.");
  }

  rp(
    `https://indian-railway-api.cyclic.app/trains/getTrain/?trainNo=${trainNo}`
  )
    .then((resp) => {
      const responseData = JSON.parse(resp);
      res.status(200).json(responseData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error fetching train data.");
    });
});

router.get("/betweenStations", function (req, res) {
  const from = req.query.from;
  const to = req.query.to;
  rp(
    `https://indian-railway-api.cyclic.app/trains/betweenStations/?from=${from}&to=${to}`
  )
    .then((resp) => {
      // Parse the response JSON if necessary
      const responseData = JSON.parse(resp);
      // Send the response back to the client
      res.status(200).json(responseData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error fetching train data.");
    });
});
// router.get("/betweenStations", function (req, res) {
//   const from = req.query.from;
//   const to = req.query.to;
//   rp(
//     `https://indian-railway-api.cyclic.app/trains/betweenStations/?from=${from}&to=${to}`
//   )
//     .then((resp) => {
//       // Parse the response JSON if necessary
//       const responseData = JSON.parse(resp);
//       // Send the response back to the client
//       res.status(200).json(responseData);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send("Error fetching train data.");
//     });
// });

router.get("/betweenStationsdate", function (req, res) {
  const from = req.query.from;
  const to = req.query.to;
  const date = req.query.date;
  rp(
    `https://indian-railway-api.cyclic.app/trains/betweenStations/?from=${from}&to=${to}&date=${date}`
  )
    .then((resp) => {
      // Parse the response JSON if necessary
      const responseData = JSON.parse(resp);
      // Send the response back to the client
      res.status(200).json(responseData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error fetching train data.");
    });
});

//
router.get("/getRoute", function (req, res) {
  const trainNo = req.query.trainNo;

  rp(`https://indian-railway-api.cyclic.app/trains/getRoute?trainNo=${trainNo}`)
    .then((resp) => {
      // Parse the response JSON if necessary
      const responseData = JSON.parse(resp);
      // Send the response back to the client
      res.status(200).json(responseData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error fetching train data.");
    });
});

module.exports = router;
