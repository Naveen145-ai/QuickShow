const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    movieTitle: { type: String, required: true },
    showTime: { type: String, required: true },
    seats: { type: [String], required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
