const Booking = require("../models/bookingModel");

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res) => {
  const { userEmail, movieTitle, showTime, seats, totalPrice } = req.body;

  if (!userEmail || !movieTitle || !showTime || !seats || seats.length === 0 || !totalPrice) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const booking = await Booking.create({ userEmail, movieTitle, showTime, seats, totalPrice });
    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all bookings (optional, for admin)
// @route   GET /api/bookings
// @access  Public/Admin
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createBooking, getBookings };
