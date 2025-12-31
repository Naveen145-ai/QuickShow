const express = require("express");
const router = express.Router();
const { createBooking, getBookings } = require("../controllers/bookingController");

router.post("/postBook", createBooking);
router.get("/getBook", getBookings);

module.exports = router;
