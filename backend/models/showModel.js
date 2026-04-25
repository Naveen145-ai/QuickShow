const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  title: { type: String, required: true },
  poster: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  times: { type: [String], default: [] }, // e.g. 'Tue, June 1 at 7:30 PM' or ISO strings
  active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Show', showSchema);
